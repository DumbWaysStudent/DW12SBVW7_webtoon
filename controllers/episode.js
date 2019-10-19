const { User, Santoon, Episode } = require('../models');
const noImage =
  'https://smart-akis.com/SFCPPortal/app/img/picture-not-available.jpg';

exports.findAllEpisodes = async (req, res) => {
  try {
    const data = await Episode.findAll({
      include: [
        {
          model: Santoon,
          attributes: ['id', 'title', 'genre'],
          where: { id: req.params.santoonId },
        },
      ],
      order: [['id', 'DESC']],
    });

    const episodes = data.map(item => {
      const objEpisode = {
        id: item.id,
        santoonTitle: item.Santoon.title,
        title: item.title,
        image: item.image,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      };
      return objEpisode;
    });
    res.json(episodes);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong, please try again!' });
  }
};

exports.findAllUserEpisode = async (req, res) => {
  try {
    const data = await Episode.findAll({
      include: [
        {
          model: Santoon,
          attributes: ['id', 'title', 'genre'],
          where: { id: req.params.santoonId },
          include: {
            model: User,
            as: 'author',
            where: { id: req.authorize_user.id },
            attributes: ['id', 'name'],
          },
        },
      ],
      order: [['id', 'DESC']],
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
    console.error(error);
    res.status(500).json({ error: 'Something went wrong, please try again!' });
  }
};

exports.createEpisode = async (req, res) => {
  try {
    const imageUrl = req.file.path ? req.file.path : noImage;
    const validateToon = await Santoon.findAll({
      // where: { id: req.params.santoonId }
    })
    // const episode = {
    //   title: req.body.title,
    //   image: imageUrl,
    //   santoonId: req.params.santoonId,
    // };
    // const data = await Episode.create(episode);
    res.json({msg:'oke'});
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateEpisode = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteEpisode = async (req, res) => {
  try {
    await Episode.destroy({ where: { id: req.params.episodeId } });
    res.json({ id: req.params.episodeId });
  } catch (error) {
    res.status(500).json(error);
  }
};
