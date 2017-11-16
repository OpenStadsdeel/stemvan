var createError = require('http-errors');
var nunjucks    = require('nunjucks');

module.exports = function( app ) {
	var env = app.settings.nunjucksEnv;
	
	app.get('/:pageName', function( req, res, next ) {
		var tplName = req.params.pageName+'.njk';
		env.getTemplate(tplName, function( err, tpl ) {
			if( err ) {
				return next(createError(404, 'Pagina niet gevonden'));
			}
			
			res.render(tplName);
		});
	});
};