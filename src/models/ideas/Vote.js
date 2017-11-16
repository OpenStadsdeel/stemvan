var config = require('config');

module.exports = function( db, sequelize, DataTypes ) {
	var Vote = sequelize.define('vote', {
		ideaId: {
			type         : DataTypes.INTEGER,
			allowNull    : false
		},
		userId: {
			type         : DataTypes.INTEGER,
			allowNull    : false
		},
		ip: {
			type         : DataTypes.STRING(64),
			allowNull    : true,
			validate     : {
				isIP: true
			}
		},
		opinion: {
			type         : DataTypes.ENUM('no','yes','abstain'),
			allowNull    : false
		},
		// This will be true if the vote validation CRON determined this
		// vote is valid.
		checked : {
			type         : DataTypes.BOOLEAN,
			allowNull    : true
		}
	}, {
		indexes: [{
			fields : ['ideaId', 'userId'],
			unique : true
		}],
		classMethods: {
			associate: function( models ) {
				Vote.belongsTo(models.Idea);
				Vote.belongsTo(models.User);
			},
			
			anonimizeOldVotes: function() {
				var anonimizeThreshold = config.get('ideas.anonimizeThreshold');
				return sequelize.query(`
					UPDATE
						votes v
					SET
						v.ip = NULL
					WHERE
						DATEDIFF(NOW(), v.updatedAt) > ${anonimizeThreshold} AND
						checked != 0
				`)
				.spread(function( result, metaData ) {
					return metaData;
				});
			}
		},
		instanceMethods: {
			toggle: function() {
				var checked = this.get('checked');
				return this.update({
					checked: checked === null ? false : !checked
				});
			}
		}
	});
	
	return Vote;
};