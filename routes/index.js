const routes = require('express').Router();
const { register, login } = require('../controllers/user');

routes.get('/', (req, res) => {
  res.json({ msg: 'Connected to Express' });
});

routes.post('/register', register);
routes.post('/login', login);

module.exports = routes;
