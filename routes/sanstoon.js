const routes = require('express').Router();
const { findAllSanstoon, findAllEpisode } = require('../controllers/sanstoon');

routes.get('/', findAllSanstoon);
routes.get('/:sanstoonId/episodes', findAllEpisode);

module.exports = routes;