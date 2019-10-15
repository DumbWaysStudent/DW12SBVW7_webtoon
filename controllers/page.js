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
