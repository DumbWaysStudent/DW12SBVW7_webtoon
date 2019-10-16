const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const auth = req.headers.authorization;
  try {
    if (auth) {
      const decoded = jwt.verify(auth, process.env.KEY);
      req.authorize_user = decoded;
      next();
    } else {
      res.status(401).json({ auth: 'Unauthorized' });
    }
  } catch (error) {
    res.status(403).json({ auth: 'invalid token' });
  }
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
