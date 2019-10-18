const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const auth = req.headers.authorization;

  if (req.headers.authorization) {
    try {
      const decoded = jwt.verify(auth, process.env.KEY);
      req.authorize_user = decoded;
    } catch (error) {
      res.status(401).json({ auth: 'invalid token' });
    }
  }
  next();
};

exports.authorize = (req, res, next) => {
  if (req.authorize_user.id == req.params.userId) {
    next();
  } else {
    res
      .status(401)
      .json({ auth: 'You dont have permission to access this route!' });
  }
};
