
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const gzip = zlib.createGunzip();

const readable = fs.createReadStream(path.join(__dirname, 'mySource.txt'));
const compressed = fs.createWriteStream(path.join(__dirname, 'destination.txt.gz'));
readable.pipe(gzip).pipe(compressed);