const { Sanstoon, User, Favorite } = require('../models');

exports.findAll = async (req, res) => {
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
        attributes: ['id', 'email'],
        through: {
          model: Favorite,
          where: { userId: 2 } // userId whos login
        },
      },
    ],
  });
  
  const payload = data.map(item => {
    const objData = {
      title: item.title,
      genre: item.genre,
      image: item.image,
      author: item.author.name,
      isFavorite: item.isFavorite.length ? true : false,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    }
    return objData;
  });
  res.json(payload);
};
