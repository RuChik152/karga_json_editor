const express = require('express');
const path = require('path');
const app = express();

console.log(path.resolve(process.cwd(), './build'))

app.use(express.static(path.resolve(process.cwd(), 'build')));

app.get('/', function (req, res) {
	res.sendFile(path.resolve(process.cwd(), 'index.html'));
});

const PORT = 3700;

app.listen(PORT, () => {
	console.log(`SERVER START DATA: ${new Date()} http://localhost:${PORT}`)
});