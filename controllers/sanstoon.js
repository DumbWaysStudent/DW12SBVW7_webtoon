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
          },
        },
      ],
    });

    const sanstoons = data
      .map(item => {
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
    const noImage =
    'https://smart-akis.com/SFCPPortal/app/img/picture-not-available.jpg';
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
