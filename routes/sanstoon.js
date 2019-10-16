const routes = require('express').Router();
const authenticate = require('../middlewares/auth').authenticate;

const { findAllSanstoon } = require('../controllers/sanstoon');
const { findAllEpisode } = require('../controllers/episode');
const { findAllPages } = require('../controllers/page');
const { createFavorite, deleteFavorite } = require('../controllers/favorite');

routes.get('/', authenticate, findAllSanstoon);
routes.get('/:sanstoonId/episodes', findAllEpisode);
routes.get('/:sanstoonId/episode/:episodeId', findAllPages);

// Favorite
routes.post('/:sanstoonId/favorite', authenticate, createFavorite);
routes.delete('/:sanstoonId/favorite', authenticate, deleteFavorite);

module.exports = routes;