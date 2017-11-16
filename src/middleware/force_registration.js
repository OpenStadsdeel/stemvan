var createError = require('http-errors');
var auth        = require('../auth');

module.exports = function( app ) {
	app.use(function( req, res, next ) {
		if(
			!req.user ||
			!req.user.isMember() ||
			req.user.hasCompletedRegistration() ||
			req.path === '/account/complete' ||
			req.path === '/account/logout'
		) {
			return next();
		}
		
		res.format({
			html: function() {
				res.redirect('/account/complete');
			},
			json() {
				next(createError(400, 'Incomplete registration'));
			}
		})
	});
};