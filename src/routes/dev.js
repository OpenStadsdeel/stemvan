var express = require('express');
var config  = require('config');
var log     = require('debug')('app:http')
var db      = require('../db');
var auth    = require('../auth');
var mail    = require('../mail');

module.exports = function( app ) {
	if( !config.get('debug') ) {
		return;
	}
	log('initiating dev routes');
	
	var router = express.Router();
	app.use('/dev', router);
	
	router.get('/login/:userId', function( req, res, next ) {
		var userId = Number(req.params.userId);
		req.setSessionUser(userId);
		res.success('/');
	});
	
	router.post('/reset_fixtures', auth.can('dev'), function( req, res, next ) {
		db.sequelize.sync({force: true}).then(function() {
			require('../../fixtures')(db).then(function() {
				res.json(true);
			});
		}).catch(next);
	});
	
	router.get('/csrf_token', function( req, res, next ) {
		res.format({
			html: function() {
				next(createError(406))
			},
			json: function() {
				res.json({token: req.csrfToken()});
			}
		});
	});
	
	router.get('/randomize_idea_sort', function( req, res, next ) {
		var cron = require('../cron/randomize_idea_sort');
		cron.onTick().then(function() {
			res.send()
		})
		.catch(next);
	});
	
	router.get('/fonts', function( req, res, next ) {
		res.out('test/fonts', false);
	});
	
	router.get('/email/:page', function( req, res, next ) {
		var fs       = require('fs');
		var nunjucks = require('nunjucks');
		
		var data     = {
			complete : 'complete' in req.query,
			date     : new Date(),
			fullHost : req.protocol+'://'+req.hostname,
			token    : 'temp',
			userId   : req.user.id,
			ref      : req.query.ref
		};
		var content  = nunjucks.render('email/'+req.params.page+'.njk', data);
		
		mail.sendMail({
			to          : 'tjoekbezoer@gmail.com',
			subject     : 'Bedankt voor je voorstel',
			html        : content,
			// text        : nunjucks.render('email/login_link_text.njk', data),
			attachments : [{
				filename : 'logo@2x.png',
				path     : 'img/email/logo@2x.png',
				cid      : 'logo'
			}, {
				filename : 'map@2x.png',
				path     : 'img/email/map@2x.png',
				cid      : 'map'
			}, {
				filename : 'steps@2x.png',
				path     : 'img/email/steps@2x.png',
				cid      : 'steps'
			}]
		});
		res.send(content);
	});
}