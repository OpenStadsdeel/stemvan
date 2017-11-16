var db = require('../src/db');

module.exports = {
	up: function() {
		return db.ArgumentVote.sync();
	},
	down: function() {
		return db.ArgumentVote.drop();
	}
}