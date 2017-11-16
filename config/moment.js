var config = require('config');
var moment = require('moment-timezone');

moment.tz.setDefault(config.get('timeZone'));
// TODO: Set this per request based on accept-language header or
//       logged in user preference?
moment.locale(config.get('locale'));
// The custom nunjuck filter `duration` uses moment's `humanize` to
// display the remaining time. This threshold forces `humanize` to
// calculate the time in days instead of months.
moment.relativeTimeThreshold('d', config.get('ideas.duration')+1);