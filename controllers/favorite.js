const { Sanstoon, User, Favorite, Episode, Page } = require('../models');

exports.createFavorite = async (req, res) => {
  try {
    await Favorite.create({
      userId: req.authorize_user.id,
      sanstoonId: req.params.sanstoonId,
    });
    let data = await Sanstoon.findAll({
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['name'],
        },
        {
          model: User,
          as: 'isFavorite',
          attributes: ['id', 'name'],
          through: {
            model: Favorite,
            attributes: [],
          },
        },
      ],
    });
    const sanstoons = data.map(item => {
      const objSanstoon = {
        id: item.id,
        title: item.title,
        genre: item.genre,
        image: item.image,
        author: item.author.name,
        isFavorite: item.isFavorite.some(v => v.id == req.authorize_user.id),
        favoriteCount: item.isFavorite.length,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      };
      return objSanstoon;
    });
    res.json(sanstoons);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteFavorite = async (req, res) => {
  try {
    await Favorite.destroy({
      where: {
        userId: req.authorize_user.id,
        sanstoonId: req.params.sanstoonId,
      },
    });
    let data = await Sanstoon.findAll({
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['name'],
        },
        {
          model: User,
          as: 'isFavorite',
          attributes: ['id', 'name'],
          through: {
            model: Favorite,
            attributes: [],
          },
        },
      ],
    });
    const sanstoons = data.map(item => {
      const objSanstoon = {
        id: item.id,
        title: item.title,
        genre: item.genre,
        image: item.image,
        author: item.author.name,
        isFavorite: item.isFavorite.some(v => v.id == req.authorize_user.id),
        favoriteCount: item.isFavorite.length,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      };
      return objSanstoon;
    });
    res.json(sanstoons);
  } catch (error) {
    res.status(500).json(error);
  }
};
