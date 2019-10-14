const { Sanstoon, User } = require('../models');

exports.findAll = (req, res) => {
  Sanstoon.findAll({
    include: [
      {
        model: User,
        as: 'author',
      },
    ],
  })
    .then(response => {
      const payload = [];
      response.forEach(item => {
        const data = {
          title: item.title,
          genre: item.genre,
          isFavorite: item.is_favorite,
          image: item.image,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          author: item.author.name,
        };
        payload.push(data);
      });
      res.json(payload);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};
