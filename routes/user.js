const routes = require('express').Router();
const { authenticate, authorize } = require('../middlewares/auth');
const images = require('../helpers/images');

const {
  findAllUserToon,
  createToon,
  updateUserToon,
  deleteUserToon,
} = require('../controllers/santoon');
const {
  findAllUserEpisode,
  createEpisode,
  updateEpisode,
  deleteEpisode,
} = require('../controllers/episode');
const {
  findAllUserPages,
  createPage,
  deletePage,
} = require('../controllers/page');

const { editProfile, findOne } = require('../controllers/user');

// Profile
routes.get('/:userId/profile', findOne);
routes.put(
  '/:userId/profile',
  authenticate,
  authorize,
  images.upload.single('img'),
  editProfile,
);

// Santoon (Done migration from Sanstoon to Santoon)
routes.get('/:userId/santoons', authenticate, authorize, findAllUserToon);
routes.post(
  '/:userId/santoon',
  authenticate,
  authorize,
  images.upload.single('img'),
  createToon,
);
routes.put(
  '/:userId/santoon/:santoonId',
  authenticate,
  authorize,
  images.upload.single('img'),
  updateUserToon,
);
routes.delete(
  '/:userId/santoon/:santoonId',
  authenticate,
  authorize,
  deleteUserToon,
);

// Episode
routes.get(
  '/:userId/santoon/:santoonId/episodes',
  authenticate,
  authorize,
  findAllUserEpisode,
);
routes.post(
  '/:userId/santoon/:santoonId/episode',
  authenticate,
  authorize,
  images.upload.single('img'),
  createEpisode,
);
routes.put(
  '/:userId/santoon/:santoonId/episode/:episodeId',
  authenticate,
  authorize,
  images.upload.single('img'),
  updateEpisode,
);
routes.delete(
  '/:userId/santoon/:santoonId/episode/:episodeId',
  authenticate,
  authorize,
  deleteEpisode,
);

// Page
routes.get(
  '/:userId/santoon/:santoonId/episode/:episodeId/images',
  authenticate,
  authorize,
  findAllUserPages,
);
routes.post(
  '/:userId/santoon/:santoonId/episode/:episodeId/image',
  authenticate,
  authorize,
  createPage,
);
routes.delete(
  '/:userId/santoon/:santoonId/episode/:episodeId/image/:imageId',
  authenticate,
  authorize,
  deletePage,
);

module.exports = routes;
