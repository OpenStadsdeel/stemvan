var should        = require('should');
var ary           = require('lodash/ary');
var Promise       = require('bluebird');

var Notifications = require('../src/notifications/Notifications');
var Publication   = Notifications.Publication;
var MemoryStore   = require('../src/notifications/MemoryStore');

Promise.longStackTraces();

describe('Notifications', function() {
	describe('store', function() {
		it('returns a promise on all public methods', function() {
			var store = new MemoryStore();
			store.addEventListener('email', 1, 'foo', 1, ['add']).should.be.instanceof(Promise);
			store.removeEventListener('email', 1, 'foo', 1, ['add']).should.be.instanceof(Promise);
			store.getUsersForEvent('email', 0, 'foo', 1, 'add').should.be.instanceof(Promise);
			store.queueEvent('email', 'foo', 1, 'add', [1], {}).should.be.instanceof(Promise);
			store.iterateQueue('email', function(){}).should.be.instanceof(Promise);
			store.clearQueue('email', 1).should.be.instanceof(Promise);
			store.userWantsMessage('email', 1).should.be.instanceof(Promise);
			store.updateLastMessageDate('email', 1, new Date()).should.be.instanceof(Promise);
		});
		
		it.skip('registers event listeners', function() {
			
		});
		
		it.skip('removes event listeners', function() {
			
		});
		
		it.skip('handles triggered events', function() {
			
		});
		
		it.skip('gets queued users for a triggered event', function() {
			
		});
	});
	
	describe('subscription', function() {
		var not   = new Notifications();
		var store = new MemoryStore();
		var pub   = not.addPublication(new Publication('email', store, {
			assets: {
				'foo': [{
					events : ['add']
				}]
			},
			
			sendMessage: function( user ) {}
		}));
		
		it.skip('works in its basic form', function() {
			return not.subscribe('email', 1, null, null, ['add'])
			.then(function(){
				return not.trigger(null, 'foo', 1, 'add');
			})
			.then(function() {
				
			});
		});
		
		it.skip('works on duplicate subscriptions', function() {
			
		});
		
		
	});
});