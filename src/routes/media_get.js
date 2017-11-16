var createError = require('http-errors');
var db          = require('../db');

module.exports = function( app ) {
	app.get('/image/:key', function( req, res, next ) {
		var where = 'thumb' in req.query ?
		            {key: {$in: [
		            	req.params.key, db.Image.thumbName(req.params.key)
		            ]}} :
		            {key: req.params.key};
		
		db.Image.findOne({where: where, order: '`key` DESC'})
		.then(function( image ) {
			if( !image ) {
				return next(createError(404, 'Afbeelding niet gevonden'));
			} else {
				res.type(image.mimeType);
				res.send(image.data);
			}
		})
		.catch(next);
	});
};