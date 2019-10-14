require('dotenv').config();
require('express-group-routes');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// routes
const indexRoutes = require('./routes/index');

app.use(express.json());

app.group('/api/v1', routes => {
  routes.use('/', indexRoutes);
});

app.listen(port, () => console.log('App listening on port', port));