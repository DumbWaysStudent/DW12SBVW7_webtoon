const routes = require('express').Router();
const authenticate = require('../middlewares/auth').authenticate;

const { findAllToons } = require('../controllers/santoon');
const { findAllEpisodes } = require('../controllers/episode');
const { findAllPages } = require('../controllers/page');
const { createFavorite, deleteFavorite } = require('../controllers/favorite');

routes.get('/', authenticate, findAllToons);
routes.get('/:santoonId/episodes', findAllEpisodes);
routes.get('/:santoonId/episode/:episodeId', findAllPages);

// Favorite
routes.post('/:santoonId/favorite', authenticate, createFavorite);
routes.delete('/:santoonId/favorite', authenticate, deleteFavorite);

module.exports = routes;