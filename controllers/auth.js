const { User } = require('../models');
const jwt = require('jsonwebtoken');
const compare = require('../helpers/bcrypt').compare;

exports.register = (req, res) => {
  User.create({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
  })
    .then(response => {
      const payload = {
        id: response.id,
        email: response.email,
        name: response.name,
        imageUrl: response.imageUrl,
      };
      const token = jwt.sign(payload, process.env.KEY);
      res.status(201).json({
        token,
        payload,
      });
    })
    .catch(err => {
      let objError = {};
      err.errors.forEach(error => {
        objError[error.path] = error.message;
      });
      res.status(400).json({ error: objError });
    });
};

exports.login = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then(response => {
      if (response) {
        const validate = compare(req.body.password, response.password);
        if (validate) {
          const payload = {
            id: response.id,
            email: response.email,
            name: response.name,
            imageUrl: response.imageUrl,
          };
          const token = jwt.sign(payload, process.env.KEY);
          res.json({
            token,
            payload,
          });
        } else {
          res.status(400).json({ message: 'Wrong email/password' });
        }
      } else {
        res.status(400).json({ message: 'Wrong email/password' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};
