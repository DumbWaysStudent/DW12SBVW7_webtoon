'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sanstoon = sequelize.define(
    'Sanstoon',
    {
      title: DataTypes.STRING,
      genre: DataTypes.STRING,
      image: DataTypes.STRING,
      created_by: DataTypes.INTEGER,
    },
    {},
  );
  Sanstoon.associate = function(models) {
    // associations can be defined here
    Sanstoon.hasMany(models.Episode, {
      as: 'Episode',
      foreignKey: 'sanstoon_id'
    });
    Sanstoon.belongsTo(models.User, {
      as: 'author',
      foreignKey: 'created_by',
    });
    Sanstoon.belongsToMany(models.User, {
      through: 'Favorites',
      as: 'isFavorite',
      foreignKey: 'sanstoonId',
    });
  };
  return Sanstoon;
};
