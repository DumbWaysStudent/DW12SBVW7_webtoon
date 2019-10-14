'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    isFavorite: DataTypes.BOOLEAN
  }, {});
  Favorite.associate = function(models) {
    // associations can be defined here
  };
  return Favorite;
};