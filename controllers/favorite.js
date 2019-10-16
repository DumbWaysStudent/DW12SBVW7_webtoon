const { Sanstoon, User, Favorite, Episode, Page } = require('../models');

exports.createFavorite = async (req, res) => {
  try {
    const data = await Favorite.create({
      userId: req.authorize_user.id,
      sanstoonId: req.params.sanstoonId
    });
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteFavorite = async (req, res) => {
  try {
    const data = await Favorite.destroy({
      where: {
        userId: req.authorize_user.id,
        sanstoonId: req.params.sanstoonId
      }
    });
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
