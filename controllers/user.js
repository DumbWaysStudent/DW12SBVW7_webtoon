const { User, Sanstoon, Episode } = require('../models');

exports.findAllUserToon = async (req, res) => {
  try {
    if (req.authorize_user.id == req.params.userId) {
      let data = await Sanstoon.findAll({
        where: { created_by: req.params.userId },
      });
      res.json(data);
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
        image:
          'https://i.pinimg.com/originals/1b/33/19/1b33195fbe69f9cfbe74585e97ff6eb4.jpg',
        created_by: req.authorize_user.id,
      };
      let data = await Sanstoon.create(toon);
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
      let data = await Episode.findAll({
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
