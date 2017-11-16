var config         = require('config')
  , createError    = require('http-errors')
  , extend         = require('lodash/extend')
  , log            = require('debug')('app:user')
  , pick           = require('lodash/pick');

var auth           = require('../auth');
var Password       = require('../auth/password');
var notifications  = require('../notifications');
var sanitize       = require('../util/sanitize');

// For detecting throwaway accounts in the email address validation.
var emailBlackList = require('../../config/mail_blacklist')
  , emailDomain    = /^.+@(.+)$/;

module.exports = function( db, sequelize, DataTypes ) {
	var User = sequelize.define('user', {
		role: {
			type         : DataTypes.STRING(32),
			allowNull    : false,
			defaultValue : 'anonymous',
			validate     : {
				isIn: {
					args : [['unknown', 'anonymous', 'member', 'admin', 'su']],
					msg  : 'Unknown user role'
				}
			}
		},
		// For unknown/anon: Always `false`.
		// For members: `true` when the user profile is complete. This is set
		//              to `false` by default, and should be set to `true`
		//              after the user has completed the registration. Until
		//              then, the 'complete registration' form should be displayed
		//              instead of any other content.
		complete: {
			type         : DataTypes.BOOLEAN,
			allowNull    : false,
			defaultValue : false
		},
		
		email: {
			type         : DataTypes.STRING(255),
			allowNull    : true,
			validate     : {
				isEmail: {
					msg: 'Geen geldig emailadres'
				},
				notBlackListed: function( email ) {
					var domainName = emailDomain.exec(email)[1];
					if( domainName in emailBlackList ) {
						throw Error('Graag je eigen emailadres gebruiken; geen tijdelijk account');
					}
				}
			}
		},
		password: {
			type         : DataTypes.VIRTUAL,
			allowNull    : true,
			defaultValue : null,
			validate     : {
				len: {
					args : [6,64],
					msg  : 'Wachtwoord moet tussen 6 en 64 tekens zijn'
				}
			},
			set          : function( password ) {
				var method = config.get('security.passwordHashing.currentMethod');
				this.setDataValue('password', password);
				this.set('passwordHash', password ?
				                         Password[method].hash(password) :
				                         null
				);
			}
		},
		passwordHash: {
			type         : DataTypes.TEXT,
			allowNull    : true,
			set          : function( hashObject ) {
				var hash = hashObject ? JSON.stringify(hashObject) : null;
				this.setDataValue('passwordHash', hash);
			}
		},
		
		firstName: {
			type         : DataTypes.STRING(64),
			allowNull    : true,
			set          : function( value ) {
				this.setDataValue('firstName', sanitize.noTags(value));
			}
		},
		lastName: {
			type         : DataTypes.STRING(64),
			allowNull    : true,
			set          : function( value ) {
				this.setDataValue('lastName', sanitize.noTags(value));
			}
		},
		fullName: {
			type         : DataTypes.VIRTUAL,
			allowNull    : true,
			get          : function() {
				var firstName = this.getDataValue('firstName') || '';
				var lastName  = this.getDataValue('lastName') || '';
				return firstName || lastName ?
				       (firstName+' '+lastName) :
				       undefined;
			}
		},
		initials: {
			type         : DataTypes.VIRTUAL,
			allowNull    : true,
			get          : function() {
				var firstName = this.getDataValue('firstName') || '';
				var lastName  = this.getDataValue('lastName') || '';
				var initials  = (firstName ? firstName.substr(0,1) : '') +
				                (lastName ? lastName.substr(0,1) : '');
				return initials.toUpperCase();
			}
		},
		gender: {
			type         : DataTypes.ENUM('male', 'female'),
			allowNull    : true
		},
		zipCode: {
			type         : DataTypes.STRING(10),
			allowNull    : true,
			validate     : {
				is: {
					args : [/^\d{4} ?[a-zA-Z]{2}$/],
					msg  : 'Ongeldige postcode'
				}
			},
			set          : function( zipCode ) {
				zipCode = zipCode != null ?
				          String(zipCode).trim() :
				          null;
				this.setDataValue('zipCode', zipCode);
			}
		}
	}, {
		charset: 'utf8',
		
		indexes: [{
			fields: ['email'],
			unique: true
		}],
		
		validate: {
			hasValidUserRole: function() {
				if( this.id !== 1 && this.role === 'unknown' ) {
					throw new Error('User role \'unknown\' is not allowed');
				}
			},
			isValidAnon: function() {
				if( this.role === 'unknown' || this.role === 'anonymous' ) {
					if( this.complete || this.email ) {
						throw new Error('Anonymous users cannot be complete profiles or have a mail address');
					}
				}
			},
			isValidMember: function() {
				if( this.role !== 'unknown' && this.role !== 'anonymous' ) {
					if( !this.email ) {
						throw new Error('Onjuist email adres');
					} else if( this.complete && (!this.firstName || !this.lastName) ) {
						throw new Error('Voor- en achternaam zijn verplichte velden');
					}
				}
			},
			onlyMembersCanLogin: function() {
				if( this.role === 'unknown' || this.role === 'anonymous' ) {
					if( this.passwordHash ) {
						throw new Error('Anonymous profiles cannot have login credentials');
					}
				}
			}
		},
		classMethods: {
			associate: function( models ) {
				this.hasMany(models.Idea);
				this.hasMany(models.Vote);
				this.hasMany(models.Argument);
				this.hasMany(models.ThumbsUp);
			},
			findByCredentials: function( email, password ) {
				if( !email || !password ) {
					return Promise.reject(createError(400, 'Incomplete credentials'));
				}
				
				return this.findOne({where: {email: email}}).then(function( user ) {
					if( !user || !user.authenticate(password) ) {
						// TODO: AuthenticationError
						throw createError(403, 'Login failed');
					} else {
						return user;
					}
				});
			},
			findMember: function( email ) {
				if( !email ) {
					return Promise.reject(createError(400, 'Geen emailadres ingevuld'));
				}
				
				return this.findOne({where: {
					email : email
				}});
			},
			
			registerAnonymous: function( zipCode ) {
				return this.create({
					role    : 'anonymous',
					zipCode : zipCode
				});
			},
			// `currentUser` is the user instance that the system loaded for
			// this session.
			registerMember: function( currentUser, email ) {
				var data = {
					role  : 'member',
					email : email
				};
				
				return User.findMember(email)
				.then(function( existingUser ) {
					if( existingUser ) {
						// If there is already a member with this email address,
						// just return that one. This is probably someone who
						// actually wants to login.
						return existingUser;
					} else if( currentUser.isAnonymous() ) {
						// If the current user is anonymous, it means they already
						// created an 'account' by filling in their zipcode during
						// voting. Upgrade this account to a member.
						return currentUser.update(data);
					} else {
						// No existing user, and the current user is of type unknown.
						// Members should not be able to reach this point; the ACL
						// prevents it.
						return User.create(data);
					}
				});
			}
		},
		instanceMethods: {
			completeRegistration: function( data ) {
				var self = this;
				var filtered = pick(data, [
					'firstName', 'lastName', 'zipCode', 'gender', 'password'
				]);
				filtered.complete = true;
				return this.update(filtered)
				.catch(function( error ) {
					// We need to set `complete` initially for the `isValidMember`
					// validation to work correctly. There was an error completing
					// registration however, so we unset `complete` again. The
					// other properties can remain in memory so they're refilled into
					// the form together with the error message(s).
					self.set('complete', false);
					throw error;
				});
			},
			
			authenticate: function( password ) {
				var method = config.get('security.passwordHashing.currentMethod');
				if( !this.passwordHash ) {
					log('user %d has no passwordHash', this.id);
					return false;
				} else {
					var hash   = JSON.parse(this.passwordHash);
					var result = Password[method].compare(password, hash);
					log('authentication for user %d %s', this.id, result ? 'succeeded' : 'failed');
					return result;
				}
			},
			hasCompletedRegistration: function() {
				return this.isMember() && this.email && this.complete;
			},
			isUnknown: function() {
				return this.role === 'unknown';
			},
			isAnonymous: function() {
				return this.role === 'anonymous';
			},
			isMember: function() {
				return this.role !== 'unknown' && this.role !== 'anonymous';
			},
			isAdmin: function() {
				return this.role === 'admin' || this.role === 'su';
			},
			isLoggedIn: function() {
				return this.id && this.id !== 1 && this.isMember();
			},
			can: function( actionName /* [, resource...] */ ) {
				var user = auth.user(this);
				if( arguments.length > 1 ) {
					var resources = Array.from(arguments).slice(1);
					var args      = [actionName].concat(resources);
					return user.can.apply(user, args);
				} else {
					return user.can(actionName);
				}
			},
			
			createNewIdea: function( data ) {
				var imageKeys = data.images;
				var filtered  = pick(data, ['title', 'summary', 'description', 'location']);
				filtered.userId    = this.id;
				filtered.startDate = Date.now();
				
				return db.Idea.create(filtered)
				.bind(this)
				.tap(function( idea ) {
					notifications.trigger(this.id, 'idea', idea.id, 'create');
				})
				.tap(function( idea ) {
					return idea.updateImages(imageKeys);
				});
			},
			updateIdea: function( idea, data ) {
				var imageKeys = data.images;
				var filtered  = pick(data, ['title', 'summary', 'description', 'location']);
				
				return idea.update(filtered)
				.bind(this)
				.tap(function( idea ) {
					notifications.trigger(this.id, 'idea', idea.id, 'update');
				})
				.tap(function() {
					return idea.updateImages(imageKeys);
				});
			}
		}
	});
	
	return User;
};