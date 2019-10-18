const { Sanstoon, User, Favorite, Episode, Page } = require('../models');
const noImage =
  'https://smart-akis.com/SFCPPortal/app/img/picture-not-available.jpg';

exports.findAllToons = async (req, res) => {
  const isLogin = req.authorize_user ? true : false; // check status login
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
          },
        },
      ],
    });

    const sanstoons = data
      .map(item => {
        /**
         * CASE : LOGIN
         * ============
         * If user login, check id user who currently login on isFavorite columns,
         * if there's id user on isFavorite array, then assign the value true
         * else assign the value to false
         *
         * CASE : NOT LOGIN
         * =============
         * Set isFavorite to false if user not login.
         */
        const isFavorite = isLogin
          ? item.isFavorite.some(v => v.id == req.authorize_user.id)
          : false;
        const objSanstoon = {
          id: item.id,
          title: item.title,
          genre: item.genre,
          image: item.image,
          author: item.author.name,
          favoriteCount: item.isFavorite.length,
          isFavorite,
          isLogin,
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
            new RegExp('.*' + queryTitle.toLowerCase() + '.*').test(
              title.toLowerCase(),
            )
          );
        } else if (req.query.hasOwnProperty('title')) {
          return new RegExp('.*' + queryTitle.toLowerCase() + '.*').test(
            title.toLowerCase(),
          );
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
    let data = await Sanstoon.findAll({
      include: [
        {
          model: User,
          as: 'isFavorite',
          attributes: ['id', 'name'],
          through: {
            model: Favorite,
            attributes: [],
          },
        },
        {
          model: Episode,
          as: 'Episode',
        },
      ],
      where: {
        created_by: req.authorize_user.id,
      },
    });

    const userToons = data.map(item => {
      const userToon = {
        id: item.id,
        title: item.title,
        genre: item.genre,
        image: item.image,
        isFavorite: item.isFavorite.some(v => v.id == req.authorize_user.id),
        favoriteCount: item.isFavorite.length,
        episodes: item.Episode.length + '',
        created_by: item.created_by,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
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
    const imageUrl = req.file.path ? req.file.path : noImage;

    const toon = {
      title: req.body.title,
      genre: req.body.genre,
      image: imageUrl,
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
      image: req.file.path,
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
