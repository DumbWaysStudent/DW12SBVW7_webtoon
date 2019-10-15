const { User, Sanstoon, Favorite, Episode, Page } = require('../models');

exports.findAllUserPages = async (req, res) => {
  try {
    if (req.authorize_user.id == req.params.userId) {
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
      res.send(data);
    } else {
      res
        .status(401)
        .json({ auth: 'You dont have permission to access this route!' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createPage = async (req, res) => {
  try {
    if (req.authorize_user.id == req.params.userId) {
      const page = {
        page: req.body.page,
        image:
          'https://swebtoon-phinf.pstatic.net/20140617_248/1403004901360ABk5x_JPEG/tower_000.jpg',
        episode_id: req.params.episodeId,
      };
      const data = await Page.create(page);
      res.json(data);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deletePage = async (req, res) => {
  try {
    if (req.authorize_user.id == req.params.userId) {
      await Page.destroy({
        where: { episode_id: req.params.episodeId, id: req.params.im },
      });
      res.json({ id: req.params.imageId });
    } else {
      res
        .status(401)
        .json({ auth: 'You dont have permission to access this route!' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
