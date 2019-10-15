const { User, Sanstoon, Favorite, Episode } = require('../models');

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

exports.createEpisode = async (req, res) => {
  try {
    if (req.authorize_user.id == req.params.userId) {
      const episode = {
        title: req.body.title,
        image: 'https://swebtoon-phinf.pstatic.net/20140617_248/1403004901360ABk5x_JPEG/tower_000.jpg',
        sanstoon_id: req.params.sanstoonId
      }
      const data = await Episode.create(episode);
      res.json(data);
    } else {
      res.status(401).json({ auth: 'You dont have permission to access this route!' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}