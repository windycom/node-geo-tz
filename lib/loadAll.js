const Path = require('path');
const Fs = require('fs-extra');
const geobuf = require('geobuf');
const Pbf = require('pbf');
const v8 = require('v8');

const PATH = Path.join(__dirname, '..', 'data');

const PATHS = {
  'a': 0,
  'b': 1,
  'c': 2,
  'd': 3,
};

const loadFolder = async (relPath) => {
	const files = (await Fs.readdir(relPath)).map(f => ({
		path: Path.join(relPath, f),
		name: f,
	}));
	const foldersHere = [];
	for (const file of files) {
		if (file.name === 'geo.buf') {
			// a buffer: Return immediately with content. Don't check other files or
			// folders here.
			return geobuf.decode(new Pbf(await Fs.readFile(file.path)));
		} else if (typeof PATHS[file.name] !== 'undefined') {
			foldersHere[PATHS[file.name]] = await loadFolder(file.path);
		}
	}
	return foldersHere;
};

const loadAll = () => {
	return loadFolder(PATH);
};

module.exports = loadAll;
