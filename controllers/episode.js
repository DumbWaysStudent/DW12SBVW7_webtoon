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
        id: item.id,
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
  const imageUrl = req.file ? req.file.path : noImage;
  try {
    const validateToon = await Santoon.findOne({
      where: { id: req.params.santoonId },
    });
    if (validateToon.createdBy !== req.authorize_user.id) {
      return res.status(401).json({ error: 'Permission denied!' });
    }
    const episode = {
      title: req.body.title,
      image: imageUrl,
      santoonId: req.params.santoonId,
    };
    const data = await Episode.create(episode);
    res.status(201).json({
      success: 'Episode created!',
      data,
    });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong, please try again!' });
  }
};

exports.updateEpisode = async (req, res) => {
  const imageUrl = req.file ? req.file.path : noImage;
  try {
    const validateEpisode = await Episode.findOne({
      where: { id: req.params.episodeId },
      include: {
        model: Santoon,
        where: {
          id: req.params.santoonId,
          createdBy: req.authorize_user.id,
        },
      },
    });
    if (!validateEpisode) {
      return res.status(400).json({ error: 'Invalid' });
    }
    
    const episode = {
      title: req.body.title,
      image: imageUrl,
      santoonId: req.params.santoonId,
    };

    await Episode.update(episode, {
      where: { id: req.params.episodeId },
      include: {
        model: Santoon,
        where: {
          id: req.params.santoonId,
          createdBy: req.authorize_user.id,
        },
      },
    });
    const returnUpdated = await Episode.findOne({
      where: { id: req.params.episodeId },
    });
    if (!returnUpdated) {
      return res.status(400).json({ error: 'Not found!' });
    } else {
      return res.json({
        success: 'Episode updated!',
        returnUpdated,
      });
    }
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong, please try again!' });
  }
};

exports.deleteEpisode = async (req, res) => {
  try {
    const validateEpisode = await Episode.findOne({
      where: { id: req.params.episodeId },
      include: {
        model: Santoon,
        where: {
          id: req.params.santoonId,
          createdBy: req.authorize_user.id,
        },
      },
    });
    if (!validateEpisode) {
      return res.status(400).json({ error: 'Invalid' });
    }
    await Episode.destroy({
      where: { id: req.params.episodeId },
      include: {
        model: Santoon,
        where: {
          id: req.params.santoonId,
          createdBy: req.authorize_user.id,
        },
      },
    });
    res.json({
      id: req.params.episodeId,
      success: 'Episode deleted!',
    });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong, please try again!' });
  }
};
