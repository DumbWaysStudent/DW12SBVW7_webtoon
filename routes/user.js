const routes = require('express').Router();
const authorization = require('../middlewares/authorized').authorization;
const { findAllUserToon, createToon, findAllUserEpisode, updateUserToon, deleteUserToon } = require('../controllers/user');

routes.get('/:userId/sanstoons', authorization, findAllUserToon);
routes.post('/:userId/sanstoon', authorization, createToon);

routes.get('/:userId/sanstoon/:sanstoonId/episodes', authorization, findAllUserEpisode);
routes.put('/:userId/sanstoon/:sanstoonId', authorization, updateUserToon);
routes.delete('/:userId/sanstoon/:sanstoonId', authorization, deleteUserToon);
module.exports = routes;