var base58      = require('bs58');
var co          = require('co');
var config      = require('config');
var createError = require('http-errors');
var crypto      = require('crypto');
var extend      = require('lodash/extend');
var util        = require('util');
var Promise     = require('bluebird');

var TokenStore  = require('./TokenStore');
var store       = Promise.promisifyAll(new TokenStore());

module.exports = {
	generateToken: function( uid, originUrl ) {
		var token = base58.encode(crypto.randomBytes(16));
		var ttl   = config.get('security.sessions.tokenTTL');

		return store.storeOrUpdate(token, uid.toString(), ttl, originUrl)
		.then(function() {
			return token;
		});
	},
	
	useToken: function( token, uid ) {
		if( !token || !uid ) {
			throw createError(400, 'Missing token or user ID');
		}
		
		return new Promise(function( resolve, reject ) {
			store.authenticate(token, uid.toString(), function( err, valid, originUrl ) {
				if( err ) {
					reject(err);
				} else {
					store.invalidateUser(uid)
					.then(function() {
						resolve([valid, originUrl]);
					})
					.catch(reject);
				}
			});
		});
	}
};