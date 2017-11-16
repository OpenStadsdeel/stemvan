var co = require('co');
var db = require('../db');

module.exports = function( app ) {
	app.get('/algemeen-bestuur', co.wrap(function*( req, res, next ) {
		var data = yield {
			members          : getMembers(),
			highlightedIdeas : db.Idea.getHighlighted(),
			upcomingMeetings : db.Meeting.getUpcoming(3)
		};
		
		res.out('algemeen-bestuur', true, data);
	}));
};

function getMembers() {
	return Promise.resolve([{
		id           : 1,
		name         : 'Alexander IJkelenstam',
		neighborhood : ['Frederik Hendrikbuurt', 'Hugo de Grootbuurt', 'Marcanti-eiland', 'Chassébuurt']
	}, {
		id           : 2,
		name         : 'Anne Janssen',
		neighborhood : ['Spaarndammerbuurt', 'Houthaven']
	}, {
		id           : 3,
		name         : 'Bernadette Vieverich',
		neighborhood : ['Does-, Tromp-, Geuzenbuurt', 'Gulden Winckelbuurt']
	}, {
		id           : 4,
		name         : 'Bjørn Lanser',
		neighborhood : ['Gibraltarbuurt']
	}, {
		id           : 5,
		name         : 'Dorrit de Jong',
		neighborhood : ['Jan Maijenbuurt', 'Mercatorbuurt Noord']
	}, {
		id           : 6,
		name         : 'Fenna Ulichki',
		neighborhood : ['De Baarsjes/Oud-West']
	}, {
		id           : 7,
		name         : 'Gabi Choma',
		neighborhood : ['Bellamybuurt', 'Borgerbuurt', 'Cremerbuurt']
	}, {
		id           : 8,
		name         : 'Geert van Schaik',
		neighborhood : ['Staatsliedenbuurt', 'Westerpark / Overbrakerbinnenpolder']
	}, {
		id           : 9,
		name         : 'Melanie van der Horst',
		neighborhood : ['Westerpark']
	}, {
		id           : 10,
		name         : 'Gertjan Neerhof',
		neighborhood : ['Helmersbuurt']
	}, {
		id           : 11,
		name         : 'Ilana Rooderkerk',
		neighborhood : ['Zeeheldenbuurt']
	}, {
		id           : 12,
		name         : 'Jelle de Graaf',
		neighborhood : ['Mercatorbuurt']
	}, {
		id           : 13,
		name         : 'Jeroen Poot',
		neighborhood : ['GWL-Terrein']
	}, {
		id           : 14,
		name         : 'Jeroen van Berkel',
		neighborhood : ['Bos en Lommer']
	}, {
		id           : 15,
		name         : 'Onika Pinkus',
		neighborhood : ['Postjesbuurt', 'Erasmusparkbuurt']
	}, {
		id           : 16,
		name         : 'Pieter Rietman',
		neighborhood : ['Da Costa buurt', 'Vondelparkbuurt']
	}, {
		id           : 17,
		name         : 'Stephan Hoes',
		neighborhood : ['Laan van Spartaan']
	}, {
		id           : 18,
		name         : 'Thomas de Groot',
		neighborhood : ['Robert Scottbuurt']
	}, {
		id           : 19,
		name         : 'Thomas Veenstra',
		neighborhood : ['Landlustbuurt']
	}, {
		id           : 20,
		name         : 'Yvette Hofman',
		neighborhood : ['Kolenkitbuurt', 'Oud Sloterdijk/Sloterdijk 1']
	}]);
}