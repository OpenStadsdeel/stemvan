var config = require('config');
process.env.DEBUG = config.get('logging');

// Order is relevant.
require('./config/promises');
require('./config/moment');
require('./config/debug');
require('./config/notifications');

// Start HTTP server.
var Server     = require('./src/Server');
var Cron       = require('./src/Cron');
var ImageOptim = require('./src/ImageOptim');

Cron.start();
Server.start(config.get('express.port'));
ImageOptim.start();