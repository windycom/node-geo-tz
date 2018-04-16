const Path = require('path');
const Fs = require('fs-extra');
const geobuf = require('geobuf');
const Pbf = require('pbf');
const v8 = require('v8');

const PATH = Path.join(__dirname, '..', 'data');

const isFolder = (path) => Fs.statSync(path).isDirectory();
const isFile = (path) => !isFolder(path);

const loadFolder = async (relPath) => {
	const all = (await Fs.readdir(relPath)).map(f => Path.join(relPath, f));
	const folders = all.filter(isFolder).sort();
	const files = all.filter(isFile);

	if (folders.length) {
		const level = [];
		console.assert(!files.length);
		for (const folder of folders) {
			level.push(await loadFolder(folder));
		}
		return level;
	}
	console.assert(!folders.length);
	console.assert(files.length === 1);
	const data = new Pbf(await Fs.readFile(files[0]));
	return geobuf.decode(data);
};

const loadAll = () => {
	return loadFolder(PATH);
};

module.exports = loadAll;

/*
console.log(v8.getHeapStatistics());
loadAll().then((rootItem) => {
	console.log(v8.getHeapStatistics());
	console.log(typeof rootItem);
});
*/
