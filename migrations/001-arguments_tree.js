var db = require('../src/db').sequelize;

module.exports = {
	up: function() {
		return db.query(`
			ALTER TABLE
				arguments
			ADD
				parentId INT  UNSIGNED  NULL  DEFAULT NULL  AFTER id
		`);
	}
}