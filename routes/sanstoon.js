const routes = require('express').Router();
const { findAllSanstoon, findAllEpisode, findAllPages } = require('../controllers/sanstoon');

routes.get('/', findAllSanstoon);
routes.get('/:sanstoonId/episodes', findAllEpisode);
routes.get('/:sanstoonId/episode/:episodeId', findAllPages);

module.exports = routes;