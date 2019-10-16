const routes = require('express').Router();
const authenticate = require('../middlewares/auth').authenticate;

const { findAllSanstoon } = require('../controllers/sanstoon');
const { findAllEpisode } = require('../controllers/episode');
const { findAllPages } = require('../controllers/page');

routes.get('/', authenticate, findAllSanstoon);
routes.get('/:sanstoonId/episodes', findAllEpisode);
routes.get('/:sanstoonId/episode/:episodeId', findAllPages);

module.exports = routes;