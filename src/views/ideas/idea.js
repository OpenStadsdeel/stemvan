var clone = require('lodash/clone');

module.exports = function( req, res, data ) {
	var processed = clone(data);
	var idea      = data.idea.toJSON();
	
	processed.idea = idea;
	if( !req.can('user:mail') ) {
		delete idea.user.email;
	}
	idea.argumentsFor.forEach(function( arg ) {
		if( !req.can('user:mail') ) {
			delete arg.user.email;
		}
	});
	
	return processed;
};