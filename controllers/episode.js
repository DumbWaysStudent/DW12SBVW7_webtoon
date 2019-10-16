const { Sanstoon, Episode } = require('../models');

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
        sanstoon_title: item.Sanstoon.title,
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
      res
        .status(401)
        .json({ auth: 'You dont have permission to access this route!' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createEpisode = async (req, res) => {
  try {
    if (req.authorize_user.id == req.params.userId) {
      const episode = {
        title: req.body.title,
        image:
          'https://swebtoon-phinf.pstatic.net/20140617_248/1403004901360ABk5x_JPEG/tower_000.jpg',
        sanstoon_id: req.params.sanstoonId,
      };
      const data = await Episode.create(episode);
      res.json(data);
    } else {
      res
        .status(401)
        .json({ auth: 'You dont have permission to access this route!' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateEpisode = async (req, res) => {
  try {
    if (req.authorize_user.id == req.params.userId) {
      const episode = {
        title: req.body.title,
        image:
          'https://i.pinimg.com/originals/1b/33/19/1b33195fbe69f9cfbe74585e97ff6eb4.jpg',
        sanstoon_id: req.params.sanstoonId,
      };
      const data = await Episode.update(episode, {
        where: { id: req.params.episodeId },
      });
      if (data) {
        const updatedData = await Episode.findOne({
          where: { id: req.params.episodeId },
        });
        res.json(updatedData);
      }
    } else {
      res
        .status(401)
        .json({ auth: 'You dont have permission to access this route!' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteEpisode = async (req, res) => {
  try {
    if (req.authorize_user.id == req.params.userId) {
      await Episode.destroy({ where: { id: req.params.episodeId } });
      res.json({ id: req.params.episodeId });
    } else {
      res
        .status(401)
        .json({ auth: 'You dont have permission to access this route!' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
