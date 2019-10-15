const { User, Sanstoon, Favorite, Episode } = require('../models');

exports.findAllUserToon = async (req, res) => {
  try {
    if (req.authorize_user.id == req.params.userId) {
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
        }
        return userToon;
      });
      res.json(userToons);
    } else {
      res.status(401).json({ auth: 'You dont have permission to access this route!' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createToon = async (req, res) => {
  try {
    if (req.authorize_user.id == req.params.userId) {
      const toon = {
        title: req.body.title,
        genre: req.body.genre,
        image: 'https://i.pinimg.com/originals/1b/33/19/1b33195fbe69f9cfbe74585e97ff6eb4.jpg',
        created_by: req.authorize_user.id,
      };
      const data = await Sanstoon.create(toon);
      res.status(201).json(data);
    } else {
      res.status(401).json({ auth: 'You dont have permission to access this route!' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.findAllUserEpisode = async (req, res) => {
  try {
    if (req.authorize_user.id == req.params.userId) {
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
    } else {
      res.status(401).json({ auth: 'You dont have permission to access this route!' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateUserToon = async (req, res) => {
  try {
    if (req.authorize_user.id == req.params.userId) {
      const toon = {
        title: req.body.title,
        genre: req.body.genre,
        image: 'https://i.pinimg.com/originals/1b/33/19/1b33195fbe69f9cfbe74585e97ff6eb4.jpg',
        created_by: req.authorize_user.id,
      };
      const data = await Sanstoon.update(toon, { where: { id: req.params.sanstoonId }});
      if (data) {
        const updatedData = await Sanstoon.findOne({ where: { id: req.params.sanstoonId } });
        res.json(updatedData);
      }
    } else {
      res.status(401).json({ auth: 'You dont have permission to access this route!' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}
