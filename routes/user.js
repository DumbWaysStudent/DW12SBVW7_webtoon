const routes = require('express').Router();
const { authenticate, authorize } = require('../middlewares/auth');
const images = require('../helpers/images');

const { findAllUserToon, createToon, updateUserToon, deleteUserToon } = require('../controllers/sanstoon');
const { findAllUserEpisode, createEpisode, updateEpisode, deleteEpisode } = require('../controllers/episode');
const { findAllUserPages, createPage, deletePage } = require('../controllers/page');

const { editProfile, findOne } = require('../controllers/user');

// Profile
routes.get('/:userId/profile', findOne);
routes.put('/:userId/profile', authenticate, authorize, images.upload.single('img'), editProfile);

// Sanstoon
routes.get('/:userId/sanstoons', authenticate, authorize, findAllUserToon);
routes.post('/:userId/sanstoon', authenticate, authorize, images.upload.single('img'), createToon);
routes.put('/:userId/sanstoon/:sanstoonId', authenticate, authorize, updateUserToon);
routes.delete('/:userId/sanstoon/:sanstoonId', authenticate, authorize, deleteUserToon);

// Episode
routes.get('/:userId/sanstoon/:sanstoonId/episodes', authenticate, authorize, findAllUserEpisode);
routes.post('/:userId/sanstoon/:sanstoonId/episode', authenticate, authorize, createEpisode);
routes.put('/:userId/sanstoon/:sanstoonId/episode/:episodeId', authenticate, authorize, updateEpisode);
routes.delete('/:userId/sanstoon/:sanstoonId/episode/:episodeId', authenticate, authorize, deleteEpisode);

// Page
routes.get('/:userId/sanstoon/:sanstoonId/episode/:episodeId/images', authenticate, authorize, findAllUserPages);
routes.post('/:userId/sanstoon/:sanstoonId/episode/:episodeId/image', authenticate, authorize, createPage);
routes.delete('/:userId/sanstoon/:sanstoonId/episode/:episodeId/image/:imageId', authenticate, authorize, deletePage);

module.exports = routes;