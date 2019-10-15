const { Sanstoon, User, Favorite, Episode } = require('../models');

exports.findAllSanstoon = async (req, res) => {
  try {
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
          attributes: ['id', 'email'],
          through: {
            model: Favorite,
            where: { userId: 2 }, // userId whos login
          },
        },
      ],
    });

    const payload = data.map(item => {
      const objData = {
        title: item.title,
        genre: item.genre,
        image: item.image,
        author: item.author.name,
        isFavorite: item.isFavorite.length ? true : false,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      };
      return objData;
    });
    res.json(payload);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.findAllEpisode = async (req, res) => {
  try {
    const data = await Episode.findAll({
      include: [
        {
          model: Sanstoon,
          where: { id: req.params.sanstoonId },
        },
      ],
    });

    const episodes = data.map(item => {
      const objEpisode = {
        title: item.title,
        image: item.image,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      };
      return objEpisode;
    });
    res.json(episodes);
  } catch (error) {
    res.status(500).json(error);
  }
};
