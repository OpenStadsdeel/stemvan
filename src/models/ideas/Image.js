var path = require('path');

module.exports = function( db, sequelize, DataTypes ) {
	var Image = sequelize.define('image', {
		ideaId: {
			type      : DataTypes.INTEGER,
			allowNull : true
		},
		userId: {
			type      : DataTypes.INTEGER,
			allowNull : false
		},
		key: {
			type      : DataTypes.STRING(255),
			allowNull : false,
			validate  : {
				len: [13,255] // UNIX timestamp in ms is 13 numbers
			}
		},
		mimeType: {
			type      : DataTypes.STRING(32),
			allowNull : false
		},
		sort: {
			type         : DataTypes.INTEGER,
			allowNull    : false,
			defaultValue : 0
		},
		data: {
			type      : DataTypes.BLOB('long'),
			allowNull : false
		},
		processed: {
			type         : DataTypes.BOOLEAN,
			allowNull    : false,
			defaultValue : false
		}
	}, {
		paranoid : false,
		charset  : 'utf8',
		
		indexes: [{
			fields : ['key'],
			unique : true
		}],
		
		classMethods: {
			associate: function( models ) {
				this.belongsTo(models.Idea);
			},
			
			thumbName: function( fileName ) {
				var extName  = path.extname(fileName);
				var baseName = path.basename(fileName, extName);
				if( baseName.substr(-6) === '_thumb' ) {
					return fileName;
				} else {
					return `${baseName}_thumb${extName}`;
				}
			}
		}
	});
	
	return Image;
};