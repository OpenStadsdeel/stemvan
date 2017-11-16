var config        = require('config');
var Raven         = require('raven');

if( config.get('sentry.active') ) {
	Raven.config(config.get('sentry.url'), {
		// release: 'commit',
		// environment: 'production',
		// tags: {
		// 	git_commit: 'commit'
		// },
		parseUser: ['id', 'role']
	});
	Raven.install();
}

module.exports = Raven;