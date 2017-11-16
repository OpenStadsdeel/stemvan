var config       = require('config');
var NodeCache    = require('node-cache');
var pmx          = require('pmx');

var db           = require('../db');

var uidProperty  = config.get('security.sessions.uidProperty');
var cookieTTL    = config.get('security.sessions.cookieTTL');
var userCacheTTL = config.get('security.sessions.userCacheTTL');

var userCache = new NodeCache({
	stdTTL    : userCacheTTL,
	useClones : false
});

// PM2 trigger
// -----------
pmx.action('flushUserCache', function( reply ) {
	userCache.flushAll();
	reply(userCache.getStats());
});

db.User.findOne({where: {id: 1, role: 'unknown'}}).then(function( unknownUser ) {
	if( !unknownUser ) {
		console.error('User ID 1 must have role \'unknown\'');
		process.exit();
	} else {
		// The unknown user stays cached forever.
		userCache.set(1, unknownUser, 0);
	}
});

module.exports = function( app ) {
	app.use(function getSessionUser( req, res, next ) {
		req.setSessionUser = setSessionUser.bind(req);
		
		if( !req.session ) {
			next(Error('express-session middleware not loaded?'));
		} else {
			getUserInstance(req.session[uidProperty] || 1)
			.then(function( user ) {
				req.user = user;
				// Pass user entity to template view.
				res.locals.user = user;
				next();
			})
			.catch(next);
		}
	});
};

function setSessionUser( userId, originUrl ) {
	// The original `maxAge` is 'session', but now the user wants to
	// stay logged in.
	this.session.cookie.maxAge = cookieTTL;
	this.session[uidProperty] = userId;
	if( originUrl ) {
		this.session['ref'] = originUrl;
	}
}
function getUserInstance( userId ) {
	var user = userCache.get(userId);
	if( user ) {
		// Update cached item's TTL.
		userCache.ttl(userId);
		return Promise.resolve(user);
	} else {
		return db.User.findById(userId).then(function( user ) {
			if( !user ) {
				throw new Error('User not found');
			}
			userCache.set(userId, user);
			return user;
		});
	}
}