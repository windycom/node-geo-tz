const getTimezoneInfo = require('./index.js');

//------------------------------------------------------------------------------
const load = async () => {
	process.stdout.write('Loading quadtree... ');
	await getTimezoneInfo.loaded;
	console.log('OK.');
};

//------------------------------------------------------------------------------
const init = async (app) => {
	app.get('/:lat/:long', (req, res) => {
		res
			.set('Content-Type', 'application/json')
			.send(getTimezoneInfo(req.params.lat, req.params.long) || null);
	});
	app.use((req, res) => {
		res.status(400).end();
	});
};

//------------------------------------------------------------------------------
module.exports = {
	PORT: 8100,
	HOSTNAME: '0.0.0.0',
	load,
	init,
};
