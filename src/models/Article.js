var sanitize = require('../util/sanitize');

module.exports = function( db, sequelize, DataTypes ) {
	var Article = sequelize.define('article', {
		userId: {
			type         : DataTypes.INTEGER,
			allowNull    : true
		},
		image: {
			type         : DataTypes.STRING(255),
			allowNull    : true
		},
		video: {
			type         : DataTypes.TEXT,
			allowNull    : true,
			get          : function() {
				var raw = this.getDataValue('video');
				return raw ? JSON.parse(raw) : null;
			}
		},
		title: {
			type         : DataTypes.STRING(255),
			allowNull    : false,
			set          : function( text ) {
				this.setDataValue('title', sanitize.noTags(text));
			}
		},
		summary: {
			type         : DataTypes.TEXT,
			allowNull    : false,
			set          : function( text ) {
				this.setDataValue('summary', sanitize.safeTags(text));
			}
		},
		intro: {
			type         : DataTypes.TEXT,
			allowNull    : true,
			set          : function( text ) {
				this.setDataValue('intro', sanitize.safeTags(text));
			}
		},
		quote: {
			type         : DataTypes.STRING(255),
			allowNull    : true,
			set          : function( text ) {
				this.setDataValue('quote', sanitize.noTags(text));
			}
		},
		description: {
			type         : DataTypes.TEXT,
			allowNull    : false,
			set          : function( text ) {
				this.setDataValue('description', sanitize.safeTags(text));
			}
		}
	}, {
		classMethods: {
			scopes: scopes,
			associate: function( models ) {
				this.belongsTo(models.User);
			},
			
			getTiles: function() {
				return this.scope('asTile').findAll();
			}
		}
	});
	
	function scopes() {
		return {
			defaultScope: {
				include: [{
					model      : db.User,
					attributes : ['firstName', 'lastName']
				}]
			},
			asTile: {
				attributes: ['id', 'image', 'title', 'summary'],
				order: 'createdAt DESC'
			}
		};
	}
	
	return Article;
};