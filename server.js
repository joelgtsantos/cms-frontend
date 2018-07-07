const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 1234;

app.use('/', express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => res.sendfile('./build/index.html'));

app.listen(port, '0.0.0.0', () => console.log(`listening on ${port}`));