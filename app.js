const { port } = require('config');

const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');

const routes = require('./routes');

const app = express();

app.use(cors());
app.use(bodyparser.json());

routes(app);

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error('Error:', err);
  res.status(500).json({ error: 'Server error' });
});

app.listen(port, () => {
  console.log('App is running on port', port);
});
