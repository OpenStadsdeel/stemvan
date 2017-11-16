var util = require('../util');

module.exports = function( app ) {
	util.invokeDir('./', function( def ) {
		def(app);
	}, this);
};