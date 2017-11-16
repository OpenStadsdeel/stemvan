var jsonViews = require('../views');

module.exports = function( app ) {
	app.use(function defineOutMethod( req, res, next ) {
		res.out     = out.bind(app, req, res, next);
		res.success = success.bind(app, req, res, next);
		next();
	});
};

function out( req, res, next, viewPath, allowJSON, data ) {
	if( typeof allowJSON !== 'boolean' ) {
		throw new Error('req.out: allowJSON argument must be boolean');
	}
	
	res.format({
		html: function() {
			_resolve(req, data)
			.then(function( data ) {
				res.render(viewPath, data);
			})
			.catch(next);
		},
		json: function() {
			if( !allowJSON ) {
				return res.status(406).send('Not Acceptable');
			}
			
			_resolve(req, data)
			.then(function( data ) {
				jsonViews.render(viewPath, req, res, data);
			})
			.catch(next);
		},
		default: function() {
			res.status(406).send('Not Acceptable');
		}
	});
}

function success( req, res, next, url, data ) {
	res.format({
		html: function() {
			res.redirect(url);
		},
		json: function() {
			_resolve(req, data)
			.then(function( data ) {
				if( req.method != 'GET' ) {
					data.csrfToken = req.csrfToken();
				}
				res.json(data);
			})
			.catch(next);
		},
		default: function() {
			res.status(406).send('Not Acceptable');
		}
	});
}

function _resolve( req, data ) {
	var result;
	if( data instanceof Function ) {
		result = data();
	} else if( data instanceof Object ) {
		result = data;
	} else {
		result = {result: data};
	}
	
	return Promise.resolve(result)
	.then(function( data ) {
		if( req.session ) {
			data.messages = req.flash();
		}
		return data;
	});
}