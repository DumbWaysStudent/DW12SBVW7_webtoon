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
          attributes: ['id', 'name'],
          through: {
            model: Favorite,
            attributes: [],
            where: { userId: req.authorize_user.id }, // id authorized user
          },
        },
      ],
    });

    const sanstoons = data
      .map(item => {
        const objSanstoon = {
          title: item.title,
          genre: item.genre,
          image: item.image,
          author: item.author.name,
          isFavorite: item.isFavorite.length ? true : false,
          favoriteCount: item.isFavorite.length,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
        return objSanstoon;
      })
      .filter(item => {
        const queryTitle = req.query.title;
        const title = item.title;
        if (
          req.query.hasOwnProperty('is_favorite') &&
          req.query['is_favorite'] == 'true' &&
          req.query.hasOwnProperty('title')
        ) {
          return (
            item.isFavorite == true &&
            new RegExp('.*' + queryTitle + '.*').test(title.toLowerCase())
          );
        } else if (req.query.hasOwnProperty('title')) {
          return new RegExp('.*' + queryTitle + '.*').test(title.toLowerCase());
        } else if (
          req.query.hasOwnProperty('is_favorite') &&
          req.query['is_favorite'] == 'true'
        ) {
          return item.isFavorite == true;
        } else {
          return item;
        }
      });
    res.json(sanstoons);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.findAllUserToon = async (req, res) => {
  try {
    const data = await Sanstoon.findAll({
      include: [
        {
          model: User,
          as: 'isFavorite',
          attributes: ['id', 'email'],
          through: {
            model: Favorite,
            attributes: [],
            where: { userId: req.authorize_user.id }, // id authorized user
          },
        },
      ],
      where: { created_by: req.params.userId },
    });
    const userToons = data.map(item => {
      const userToon = {
        title: item.title,
        genre: item.genre,
        image: item.image,
        isFavorite: item.isFavorite.length ? true : false,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        created_by: item.created_by,
      };
      return userToon;
    });
    res.json(userToons);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createToon = async (req, res) => {
  try {
    const toon = {
      title: req.body.title,
      genre: req.body.genre,
      image:
        'https://i.pinimg.com/originals/1b/33/19/1b33195fbe69f9cfbe74585e97ff6eb4.jpg',
      created_by: req.authorize_user.id,
    };
    const data = await Sanstoon.create(toon);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateUserToon = async (req, res) => {
  try {
    const toon = {
      title: req.body.title,
      genre: req.body.genre,
      image:
        'https://i.pinimg.com/originals/1b/33/19/1b33195fbe69f9cfbe74585e97ff6eb4.jpg',
      created_by: req.authorize_user.id,
    };
    const data = await Sanstoon.update(toon, {
      where: { id: req.params.sanstoonId },
    });
    if (data) {
      const updatedData = await Sanstoon.findOne({
        where: { id: req.params.sanstoonId },
      });
      res.json(updatedData);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteUserToon = async (req, res) => {
  try {
    await Sanstoon.destroy({
      where: { id: req.params.sanstoonId },
    });
    res.json({ id: req.params.sanstoonId });
  } catch (error) {
    res.status(500).json(error);
  }
};
