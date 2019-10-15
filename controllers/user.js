const { User, Sanstoon } = require('../models');

exports.findAllMyToon = async (req, res) => {  
  try {
    if (req.authorize_user.id == req.params.userId) {
      let data = await Sanstoon.findAll({ where: { created_by: req.params.userId } });
      res.json(data);
    } else {
      res.status(401).json({ auth: 'You dont have permission to access this route!' });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
