var _            = require('lodash')
  , config       = require('config')
  , express      = require('express');

// Misc
var util         = require('./util');
var log          = require('debug')('app:http');

var reportErrors = config.get('sentry.active');

module.exports  = {
	app: undefined,
	
	start: function( port ) {
		log('initializing...');
		
		var Raven       = require('../config/raven');
		var compression = require('compression');
		// var cors        = require('cors');
		
		this.app = express();
		this.app.disable('x-powered-by');
		this.app.set('trust proxy', true);
		this.app.set('view engine', 'njk');
		
		if( reportErrors ) {
			this.app.use(Raven.requestHandler());
		}
		this.app.use(compression());
		// this.app.use(cors());
		
		// Register statics first...
		this._initStatics();
		
		// ... then middleware everyone needs...
		this._initRenderMiddleware();
		this._initBasicMiddleware();
		this._initSessionMiddleware();
		
		// ... then the upload functionality (not compatible with CSRF)...
		require('./routes/media_upload')(this.app);
		
		// ... security middleware (CSRF)...
		this._initSecurityMiddleware();
		
		// ... some more middlewares...
		require('./middleware/log')(this.app);
		require('./middleware/force_registration')(this.app);
		require('./middleware/nocache')(this.app);
		// ... routes...
		require('./routes/ab')(this.app);
		require('./routes/account')(this.app);
		require('./routes/article')(this.app);
		require('./routes/cookies')(this.app);
		require('./routes/default')(this.app);
		require('./routes/dev')(this.app);
		require('./routes/idea')(this.app);
		require('./routes/faq')(this.app);
		// ... static page fallback...
		require('./middleware/static_page')(this.app);
		// ... and error handlers always last.
		if( reportErrors ) {
			this.app.use(Raven.errorHandler());
		}
		require('./middleware/error_handling')(this.app);
		
		this.app.listen(port, function() {
		  log('listening on port %s', port);
		});
	},
	
	_initStatics: function() {
		var less = require('less-middleware');
		
		require('./routes/media_get')(this.app);
		// Requires custom change to less:
		// https://github.com/less/less.js/pull/2866/files
		// 
		// Current release is 2.7.1, newer release should have a fix for
		// the 'octals in strict mode' problem.
		this.app.use('/css', less('css', {
			render: {
				compress   : !config.get('debug'),
				strictMath : true
			}
		}));
		this.app.use('/css', express.static('css'));
		
		this.app.use('/fonts', express.static('fonts', {
			setHeaders: function( res ) {
				res.type('application/font-woff');
			}
		}));
		
		var headerOptions = {
			setHeaders: function( res ) {
				res.set({
					'Cache-Control': 'private'
				});
			}
		};
		this.app.use('/img', express.static('img', headerOptions));
		this.app.use('/js',  express.static('js', headerOptions));
		this.app.use('/lib',  express.static('lib', headerOptions));
	},
	_initBasicMiddleware: function() {
		var bodyParser         = require('body-parser');
		var cookieParser       = require('cookie-parser');
		var methodOverride     = require('method-override');
		
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({extended: true}));
		this.app.use(cookieParser(config.get('security.sessions.secret')));
		this.app.use(methodOverride(function( req, res ) {
			var method;
			if( req.body && req.body instanceof Object && '_method' in req.body ) {
				method = req.body._method;
				delete req.body._method;
			} else {
				method = req.get('X-HTTP-Method') ||
				         req.get('X-HTTP-Method-Override') ||
				         req.get('X-Method-Override');
			}
			if( method ) {
				log('method override: '+method);
			}
			return method;
		}));
	},
	_initSessionMiddleware: function() {
		// Session management
		// ------------------
		var flash          = require('connect-flash');
		var session        = require('express-session');
		var SequelizeStore = require('connect-session-sequelize')(session.Store);
		var db             = require('./db');
		this.app.use(session({
			name              : 'amsterdam.sid',
			secret            : config.get('security.sessions.secret'),
			proxy             : true, // Trust apache reverse proxy
			resave            : false,
			unset             : 'destroy',
			saveUninitialized : false,
			store: new SequelizeStore({
				db    : db.sequelize,
				table : 'session'
			}),
			cookie: {
				httpOnly : true,
				secure   : config.get('security.sessions.onlySecure'),
				maxAge   : null
			}
		}));
		// Middleware to fill `req.user` with a `User` instance.
		require('./middleware/session_user')(this.app);
		// Support for flash messages.
		this.app.use(flash());
		
		// Cookie consent
		// --------------
		var cookieConsent  = require('./middleware/cookie_consent');
		this.app.use(cookieConsent);
	},
	_initSecurityMiddleware: function() {
		var csurf = require('csurf');
		// `csurf` makes non-GET requests require a CSRF token. Use `req.csrfToken()`
		// in form-rendering GET request in order to send the correct token.
		// 
		// TODO: Always sets a cookie for a user-specific token secret. Rewrite to use
		//       in-memory store?
		this.app.use(csurf());
	},
	_initRenderMiddleware: function() {
		var moment       = require('moment-timezone');
		// Rendering middleware.
		var nunjucks     = require('nunjucks');
		var nunjucksVars = require('./middleware/nunjucks');
		var multiAccept  = require('./middleware/multi_accept');
		// Nunjucks variable filters.
		var dateFilter   = require('./nunjucks/dateFilter');
		var duration     = require('./nunjucks/duration');
		// Used for fetching template files.
		var siteId       = config.get('siteId');
		
		var env = nunjucks.configure([`html/${siteId}`, 'html/default'], {
			express    : this.app,
			watch      : false,
			autoescape : true
		});
		nunjucksVars(this.app);
		multiAccept(this.app);
		
		dateFilter.setDefaultFormat('DD-MM-YYYY HH:mm');
		env.addFilter('date', dateFilter);
		env.addFilter('duration', duration);
		
		// Global variables.
		env.addGlobal('ENV', this.app.get('env'));
		env.addGlobal('DOMAIN', config.get('domainName'));
		env.addGlobal('SITENAME', config.get('siteName'));
		env.addGlobal('PAGENAME_POSTFIX', config.get('pageNamePostfix'));
		env.addGlobal('EMAIL', config.get('emailAddress'));
		
		env.addGlobal('URL_ADMIN', config.get('infoUrls.administration'));
		env.addGlobal('URL_FB', config.get('infoUrls.facebook'));
		env.addGlobal('URL_TWITTER', config.get('infoUrls.twitter'));
	}
};