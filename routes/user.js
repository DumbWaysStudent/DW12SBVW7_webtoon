const routes = require('express').Router();
const authenticate = require('../middlewares/auth').authenticate;

const { findAllUserToon, createToon, updateUserToon, deleteUserToon } = require('../controllers/sanstoon');
const { findAllUserEpisode, createEpisode, updateEpisode, deleteEpisode } = require('../controllers/episode');
const { findAllUserPages, createPage, deletePage } = require('../controllers/page');

routes.use(authenticate);

// Sanstoon
routes.get('/:userId/sanstoons', findAllUserToon);
routes.post('/:userId/sanstoon', createToon);
routes.put('/:userId/sanstoon/:sanstoonId', updateUserToon);
routes.delete('/:userId/sanstoon/:sanstoonId', deleteUserToon);

// Episode
routes.get('/:userId/sanstoon/:sanstoonId/episodes', findAllUserEpisode);
routes.post('/:userId/sanstoon/:sanstoonId/episode', createEpisode);
routes.put('/:userId/sanstoon/:sanstoonId/episode/:episodeId', updateEpisode);
routes.delete('/:userId/sanstoon/:sanstoonId/episode/:episodeId', deleteEpisode);

// Page
routes.get('/:userId/sanstoon/:sanstoonId/episode/:episodeId/images', findAllUserPages);
routes.post('/:userId/sanstoon/:sanstoonId/episode/:episodeId/image', createPage);
routes.delete('/:userId/sanstoon/:sanstoonId/episode/:episodeId/image/:imageId', deletePage);

module.exports = routes;