const routes = require('express').Router();
const { findAll } = require('../controllers/sanstoon');

routes.get('/', findAll);

module.exports = routes;