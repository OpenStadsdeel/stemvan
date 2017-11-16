var Brute        = require('express-brute');
var config       = require('config');
var createError  = require('http-errors');
var express      = require('express');
var fs           = require('fs');
var nunjucks     = require('nunjucks');
var url          = require('url');

var auth         = require('../auth');
var db           = require('../db');
var mail         = require('../mail');
var passwordless = require('../auth/passwordless');

var uidProperty  = config.get('security.sessions.uidProperty');

var bruteForce   = new Brute(new Brute.MemoryStore(), {
	freeRetries  : 3,
	minWait      : 5000,
	maxWait      : 900000, // 15 min
	lifetime     : 86400, // 24 hours
	failCallback : function( req, res, next, nextValidRequestDate ) {
		var retryAfter = Math.ceil((nextValidRequestDate.getTime() - Date.now())/1000);
		res.header('Retry-After', retryAfter);
		res.locals.nextValidRequestDate = nextValidRequestDate;
		res.locals.retryAfter           = retryAfter;
		
		next(createError(429, {nextValidRequestDate: nextValidRequestDate}));
	}
});

module.exports = function( app ) {
	var router = express.Router();
	app.use('/account', router);
	
	// Logging in by email
	// -------------------
	// Most people won't have a password set, so this route will
	// send a login link to their email address.
	router.route('/login_email')
	.post(bruteForce.prevent)
	.post(function( req, res, next ) {
		var ref        = req.query.ref
		  , email      = req.body.email
		  , password   = req.body.password
		  , forceToken = !!req.body.forceToken;
		
		if( email && password ) {
			// Login with email/password.
			db.User.findByCredentials(email, password)
			.then(function( user ) {
				req.session[uidProperty] = user.id;
				req.brute.reset(function() {
					res.success(resolveURL(ref), true);
				});
			})
			.catch(function( err ) {
				// Login failed. Normally we would `throw createError()` here, but this
				// is an exception, because we want to show the login page again instead
				// of a 404 page (so the user can try again).
				req.flash('error', err.message);
				res.status(404);
				res.out('account/login_email', true, {
					method    : 'password',
					ref       : ref,
					email     : email,
					csrfToken : req.csrfToken()
				});
			});
		} else {
			db.User.findMember(email)
			.then(function( user ) {
				if( !user ) {
					throw createError(404, 'Geen gebruiker met dit emailadres gevonden');
				}
				
				// If this user has a password, display the password field.
				// Otherwise, send a login link to the user's email address.
				return !user.passwordHash || forceToken ?
				       sendAuthToken(user, req) :
				       null;
			})
			.then(function( user ) {
				if( user ) {
					res.out('account/token_sent', true, {
						method : 'token',
						isNew  : !user.complete
					});
				} else {
					res.out('account/login_email', true, {
						method    : 'password',
						ref       : ref,
						email     : email,
						csrfToken : req.csrfToken()
					});
				}
			})
			.catch(next);
		}
	})
	.post(function( err, req, res, next ) {
		if(
			req.accepts('html', 'json') === 'json' || (
				err.status != 400 &&
				err.status != 404
			)
		) {
			return next(err);
		}
		
		req.flash('error', err.message);
		res.out('account/register', false, {
			ref         : req.query.ref,
			email_login : req.body.email,
			csrfToken   : req.csrfToken()
		});
	});
	
	// Logging in by token
	// -------------------
	router.route('/login_token')
	.get(function( req, res, next ) {
		res.out('account/login_token', false, {
			csrfToken    : req.csrfToken(),
			invalidToken : !req.query.token,
			token        : req.query.token,
			uid          : req.query.uid
		});
	})
	.post(bruteForce.prevent)
	.post(function( req, res, next ) {
		var token = req.body.token;
		var uid   = req.body.uid;
		var start = Date.now();
		
		passwordless.useToken(token, uid)
		.spread(function( valid, originUrl ) {
			if( !valid ) {
				throw createError(401, 'Ongeldige link');
			}
			
			req.setSessionUser(uid, originUrl);
			req.brute.reset(function() {
				res.success(resolveURL(originUrl), true);
			});
		})
		.catch(next);
	})
	.post(function( err, req, res, next ) {
		if( err.status == 401 ) {
			res.out('account/login_token', false, {
				invalidToken: true
			});
		} else {
			next(err);
		}
	});
	
	// Logging out
	// -----------
	router.get('/logout', function( req, res ) {
		req.session.destroy();
		res.success('/', true);
	});
	
	// Register new member
	// -------------------
	router.route('/register')
	.all(auth.can('account:register'))
	.get(function( req, res, next ) {
		res.out('account/register', false, {
			ref       : req.query.ref,
			csrfToken : req.csrfToken()
		});
	})
	.post(bruteForce.prevent)
	.post(function( req, res, next ) {
		db.User.registerMember(req.user, req.body.email)
		.then(function( user ) {
			return sendAuthToken(user, req);
		})
		.then(function( user ) {
			// Renew token, so the previous one isn't reusable.
			req.csrfToken();
			res.out('account/token_sent', true, {
				isNew: !user.hasCompletedRegistration()
			});
		})
		.catch(next);
	})
	.post(function( err, req, res, next ) {
		// Sequelize validation error, or normal error?
		if( err.errors ) {
			err.errors.forEach(function( error ) {
				req.flash('error', error.message);
			});
		} else {
			req.flash('error', err.message);
		}
		
		res.out('account/register', false, {
			ref            : req.query.ref,
			email_register : req.body.email,
			csrfToken      : req.csrfToken()
		});
	});
	
	// Complete registration
	// ---------------------
	router.route('/complete')
	.all(auth.can('account:complete'))
	.get(function( req, res, next ) {
		res.out('account/complete', false, {
			csrfToken : req.csrfToken()
		});
	})
	.put(function( req, res, next ) {
		req.user.completeRegistration(req.body)
		.then(function() {
			res.success(resolveURL(req.session['ref']), true);
		})
		.catch(db.sequelize.ValidationError, function( err ) {
			err.errors.forEach(function( error ) {
				req.flash('error', error.message);
			});
			res.out('account/complete', false, {
				csrfToken : req.csrfToken()
			});
		})
		.catch(next);
	});
}

function sendAuthToken( user, req ) {
	if( !user.isMember() ) {
		throw createError(400, 'User is not a member');
	}
	
	var hasCompletedRegistration = user.hasCompletedRegistration();
	var ref                      = req.query.ref;
	
	return passwordless.generateToken(user.id, ref)
	.then(function( token ) {
		var data = {
			complete : hasCompletedRegistration,
			date     : new Date(),
			fullHost : req.protocol+'://'+req.hostname,
			token    : token,
			userId   : user.id,
			ref      : ref
		};
		mail.sendMail({
			to          : user.email,
			subject     : hasCompletedRegistration ?
			              'Inloggen' :
			              'Registreren',
			html        : nunjucks.render('email/login_link.njk', data),
			text        : nunjucks.render('email/login_link_text.njk', data),
			attachments : [{
				filename : 'logo@2x.png',
				path     : 'img/email/logo@2x.png',
				cid      : 'logo'
			}]
		});
		
		return user;
	});
}

function resolveURL( ref ) {
	var target = url.parse(ref || '', false, true);
	var path   = target.path;
	return url.resolve('/', path || '');
}