const routes = require('express').Router();
const authorization = require('../middlewares/authorized').authorization;
const { findAllMyToon } = require('../controllers/user');

routes.get('/:userId/sanstoons', authorization, findAllMyToon);

module.exports = routes;