const jwt = require('jsonwebtoken');

exports.authorization = (req, res, next) => {
  const auth = req.headers.authorization;
  try {
    if (auth) {
      const decoded = jwt.verify(auth, process.env.KEY);
      req.authroize_user = decoded;
      next();
    } else {
      res.status(401).json({ auth: 'Unauthorized' });
    }
  } catch (error) {
    res.status(403).json({ auth: 'invalid token' });
  }
};
