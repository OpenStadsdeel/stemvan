var config  = require('config');
var Promise = require('bluebird');

Promise.longStackTraces();
process.env.DEBUG = config.get('logging');

var db = require('./src/db');

if( !config.get('debug') ) {
	console.error('Not in debug mode');
	process.exit();
}

db.sequelize.sync({force: true}).then(function() {
	return require('./fixtures/dev')(db);
})
.catch(function( e ) {
	throw e;
})
.finally(function() {
	db.sequelize.close();
});