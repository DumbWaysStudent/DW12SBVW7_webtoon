const routes = require('express').Router();
const authorization = require('../middlewares/authorized').authorization;
const { findAllUserToon, createToon, findAllUserEpisode } = require('../controllers/user');

routes.get('/:userId/sanstoons', authorization, findAllUserToon);
routes.post('/:userId/sanstoon', authorization, createToon);

routes.get('/:userId/sanstoon/:sanstoonId/episodes', authorization, findAllUserEpisode);

module.exports = routes;