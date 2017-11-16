// Image optimization
// ------------------
// This module is forked in `ImageOptim` to run as a separate process.
var util = require('../util');

var actions = {};
util.invokeDir('./actions', function( action, actionName ) {
	actions[actionName] = action;
});

process.stdin.resume();
process.send('ready');
console.log('listening for tasks');

process.on('message', function( task ) {
	var actionName = task.action;
	var params     = task.params;
	if( !actionName ) {
		throw Error('Action has no name');
	}
	
	var action = actions[actionName];
	if( !action ) {
		throw Error(`Action not found: ${actionName}`);
	}
	
	action(params)
	.then(function() {
		process.send(task);
	})
	.all()
	.catch(function( error ) {
		process.send(error.stack);
	});
});