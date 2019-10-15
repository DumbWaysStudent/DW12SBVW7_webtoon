const routes = require('express').Router();
const { findAllSanstoon, findAllEpisode, findAllPages } = require('../controllers/sanstoon');
const authorization = require('../middlewares/authorized').authorization;

routes.get('/', authorization, findAllSanstoon);
routes.get('/:sanstoonId/episodes', findAllEpisode);
routes.get('/:sanstoonId/episode/:episodeId', findAllPages);

module.exports = routes;