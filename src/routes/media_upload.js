var createError = require('http-errors')
  , express     = require('express')
  , mmm         = require('mmmagic')
  , multer      = require('multer');
var db          = require('../db');
var auth        = require('../auth');

var magic = new mmm.Magic(mmm.MAGIC_MIME_TYPE);

var upload = multer();

module.exports = function( app ) {
	// TODO: Rate limit?
	//       Limit number of uploads per user?
	app.route('/image')
	.post(auth.can('image:upload'))
	.post(upload.single('file'))
	.post(function( req, res, next ) {
		var file = req.file;
		magic.detect(file.buffer, function( err, mimeType ) {
			if( err ) {
				return next(err);
			} else if( !isValidMimeType(mimeType) ) {
				return next(createError(415, 'Bestandstype niet toegestaan'));
			} else {
				db.Image.create({
					userId   : req.user.id,
					key      : req.body.key,
					mimeType : file.mimetype,
					data     : file.buffer
				})
				.then(function() {
					res.status(204).send();
				})
				.catch(function( error ) {
					next(createError(500, 'Bestand uploaden niet gelukt', error));
				});
			}
		});
	});
};

function isValidMimeType( mimeType ) {
	switch( mimeType ) {
		case 'image/png':
		case 'image/jpg':
		case 'image/jpeg':
		case 'image/gif':
			return true;
		default:
			return false;
	}
}