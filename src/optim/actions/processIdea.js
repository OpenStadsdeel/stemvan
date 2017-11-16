var Promise = require('bluebird');
var sharp   = require('sharp');

var db      = require('../../db');

module.exports = function( params ) {
	var ideaId = params.id;
	if( !ideaId ) return;
	
	return db.Image.findAll({where: {
		ideaId    : ideaId,
		processed : false
	}})
	.then(function( images ) {
		var promises = [];
		
		images.forEach(function( image ) {
			var resizedImage = optimizeImage(image);
			promises.push(resizedImage);
			
			resizedImage.tap(function() {
				if( image.sort == 0 ) {
					promises.shift(generateThumbnail(image));
				}
			});
		});
		
		return promises;
	});
};

function optimizeImage( image ) {
	return _resizeImage(image.data, 1400, 700, 70)
	.catch(function( error ) {
		// Sharp cannot process the data. It's probably not a real image, so
		// destroy the data.
		image.destroy();
		throw error;
	})
	.then(function( imageData ) {
		return image.update({
			mimeType  : 'image/jpeg',
			data      : imageData,
			processed : true
		});
	});
}
function generateThumbnail( image ) {
	return _resizeImage(image.data, 920, 360, 50)
	.then(function( imageData ) {
		var thumbFileName = db.Image.thumbName(image.key);
		return db.Image.upsert({
			ideaId    : image.ideaId,
			userId    : image.userId,
			key       : thumbFileName,
			mimeType  : 'image/jpeg',
			sort      : -1,
			data      : imageData,
			processed : true
		});
	});
}

function _resizeImage( data, width, height, quality ) {
	var resizeAction = sharp(image.data)
	.jpeg({
		quality: quality
	})
	.resize(width, height)
	.withoutEnlargement()
	.toBuffer();
	
	return Promise.resolve(resizeAction);
}