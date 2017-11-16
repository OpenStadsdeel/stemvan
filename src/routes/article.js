var config      = require('config')
  , createError = require('http-errors')
  , express     = require('express')
  , Promise     = require('bluebird');
var db          = require('../db');

module.exports = function( app ) {
	var router = express.Router();
	app.use('(/article|/artikel)', router);
	
	router.route('/:articleId')
	.all(fetchArticle)
	.get(function( req, res, next ) {
		res.out('article', true, {
			article: req.article
		});
	});
};

function fetchArticle( req, res, next ) {
	var articleId = req.params.articleId;
	db.Article.findById(articleId)
	.then(function( article ) {
		if( !article ) {
			throw createError(404, 'Artikel niet gevonden');
		} else {
			req.article = article;
			next();
		}
	})
	.catch(next);
}