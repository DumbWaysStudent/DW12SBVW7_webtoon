const { User } = require('../models');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  User.create({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
  })
    .then(response => {
      const payload = {
        email: response.email,
        name: response.name,
        imageUrl: response.imageUrl,
      };
      const token = jwt.sign(payload, process.env.KEY);
      res.json({
        token,
        payload
      });
    })
    .catch(err => {
      let objError = {};
      err.errors.forEach(error => {
        objError[error.path] = error.message;
      });
      res.status(500).json({ error: objError });
    });
};
