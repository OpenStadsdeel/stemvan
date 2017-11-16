// JSON Views
// ----------
// Used in `multi_accept` middleware to manipulate JSON output.

var path  = require('path');
var util  = require('../util');
var views = {
	render: function render( viewPath, req, res, data ) {
		var view = views[viewPath];
		if( view && view != render ) {
			var processed = view(req, res, data);
			res.json(processed);
		} else {
			res.json(data);
		}
	}
};

util.invokeDir('./', function( view, fileName, dirName ) {
	// Results in something like `ideas/idea` when the file is in
	// `/src/views/ideas/idea.js`.
	var id = path.join(
		path.relative(__dirname, dirName),
		fileName
	);
	if( views[id] ) {
		throw Error('Duplicate JSON view: '+id);
	}
	views[id] = view;
}, this);
module.exports = views;