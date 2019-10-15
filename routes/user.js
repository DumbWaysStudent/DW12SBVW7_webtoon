const routes = require('express').Router();
const authorization = require('../middlewares/authorized').authorization;

const { findAllUserToon, createToon, updateUserToon, deleteUserToon } = require('../controllers/user');
const { findAllUserEpisode, createEpisode } = require('../controllers/episode');
const { findAllUserPages } = require('../controllers/page');

routes.use(authorization);

// Sanstoon
routes.get('/:userId/sanstoons', findAllUserToon);
routes.post('/:userId/sanstoon', createToon);
routes.put('/:userId/sanstoon/:sanstoonId', updateUserToon);
routes.delete('/:userId/sanstoon/:sanstoonId', deleteUserToon);

// Episode
routes.get('/:userId/sanstoon/:sanstoonId/episodes', findAllUserEpisode);
routes.post('/:userId/sanstoon/:sanstoonId/episode', createEpisode);

// Page
routes.get('/:userId/sanstoon/:sanstoonId/episode/:episodeId/images', findAllUserPages);
module.exports = routes;