var config = require('config');

module.exports = function( req, res, next ) {
	var consent = (
	              	req.cookies &&
	              	req.cookies.cookieConsent == 'true'
	              );
	req.cookieConsent = consent;
	res.locals.cookieConsent = consent;
	
	res.acceptCookies = function() {
		if( consent ) return;
		res.cookie('cookieConsent', 'true', {
			maxAge   : 2 * 31536000000, // 2 years
			httpOnly : true,
			secure   : !config.get('debug')
		});
	};
	
	next();
};