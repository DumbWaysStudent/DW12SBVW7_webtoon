const { Sanstoon, User, Favorite, Episode, Page } = require('../models');

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
            where: { userId: req.authroize_user.id }, // id authorized user
          },
        },
      ],
    });

    const sanstoons = data.map(item => {
      const objSanstoon = {
        title: item.title,
        genre: item.genre,
        image: item.image,
        author: item.author.name,
        isFavorite: item.isFavorite.length ? true : false,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      };
      return objSanstoon;
    });

    if (req.query.hasOwnProperty('is_favorite')) {
      const favorite = sanstoons.filter(item => item.isFavorite == true);
      res.json(favorite); // Send all favorite sanstoons
    } else if (req.query.hasOwnProperty('title')) {
      const searchTitle = sanstoons.filter(item => item.title.toLowerCase() == req.query.title.toLowerCase());
      res.json(searchTitle); // Send all sanstoons with query search by title
    } else {
      res.json(sanstoons); // Send all sanstoons
    }

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
          attributes: ['id', 'title', 'genre'],
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

exports.findAllPages = async (req, res) => {
  try {
    const data = await Page.findAll({
      include: [
        {
          model: Episode,
          attributes: ['id', 'title'],
          where: { id: req.params.episodeId },
          include: [
            {
              model: Sanstoon,
              attributes: ['id', 'title', 'genre'],
              where: { id: req.params.sanstoonId },
            },
          ],
        },
      ],
    });
    const pages = data.map(item => {
      const objPages = {
        page: item.page,
        image: item.image,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      };
      return objPages;
    });
    res.json(pages);
  } catch (error) {
    res.status(500).json(error);
  }
};
