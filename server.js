const path = require('path');
const express = require('express');
const app = express();
const server = process.env.PORT || 'localhost';
const port = process.env.PORT || 1234;

app.use('/', express.static(path.join(__dirname, 'build')));

app.listen(port, server, () => console.log(`listening on ${port}`));