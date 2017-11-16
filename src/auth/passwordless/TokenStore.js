// Original: https://github.com/andreafalzetti/passwordless-nodecache
// Modified to clean up, and to use `bcrypt` instead of `bcryptjs`.

var bcrypt     = require('bcrypt');
var extend     = require('lodash/extend');
var TokenStore = require('passwordless-tokenstore');
var util       = require('util');

var AuthToken  = require('../../db').AuthToken;

function SequelizeStore() {
	TokenStore.call(this);
}
util.inherits(SequelizeStore, TokenStore);

extend(SequelizeStore.prototype, {
	authenticate: function( token, uid, callback ) {
		if( !token || !uid || !callback ) {
			throw new Error('TokenStore:authenticate called with invalid parameters');
		}

		AuthToken.findByUID(uid)
		.bind(this)
		.then(function( item ) {
			if( !item ) {
				// Key not found.
				return callback(null, false, null);
			}
			
			// Key found.
			this._validateToken(token, item, function( err, res ) {
				if( err ) {
					return callback(err, false, null);
				}

				if( res ) {
					if( !item.originUrl ) {
						return callback(null, true, '');
					} else {
						return callback(null, true, item.originUrl);
					}
				}

				return callback(null, false, null);
			});
		})
		.catch(function( error ) {
			callback(err, false, null);
		});
	},

	storeOrUpdate: function( token, uid, msToLive, originUrl, callback ) {
		if( !token || !uid || !msToLive || isNaN(msToLive) ) {
			throw new Error('TokenStore:storeOrUpdate called with invalid parameters');
		}

		return bcrypt.hash(token, 10)
		.then(function( hashedToken ) {
			var newRecord = {
				hashedToken : hashedToken,
				uid         : uid,
				validUntil  : new Date(Date.now() + msToLive),
				originUrl   : originUrl
			};

			return AuthToken.upsert(newRecord).asCallback(callback);
		});
	},

	invalidateUser: function( uid, callback ) {
		if( !uid ) {
			throw new Error('TokenStore:invalidateUser called with invalid parameters');
		}

		return AuthToken.destroyByUID(uid).asCallback(callback);
	},

	clear: function( callback ) {
		if( !callback ) {
			throw new Error('TokenStore:clear called with invalid parameters');
		}
		
		return AuthToken.truncate().asCallback(callback);
	},

	length: function( callback ) {
		return AuthToken.count().asCallback(callback);
	},

	_validateToken: function( token, storedItem, callback ) {
		if( !storedItem || storedItem.validUntil < new Date() ) {
			return callback(null, false, null);
		}
		
		bcrypt.compare(token, storedItem.hashedToken, function( err, res ) {
			if( err ) {
				return callback(err, false, null);
			}
			
			if( res ) {
				callback(null, true, storedItem.originUrl);
			} else {
				callback(null, false, null);
			}
		});
	}
});

module.exports = SequelizeStore;