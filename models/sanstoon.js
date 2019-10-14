'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sanstoon = sequelize.define('Sanstoon', {
    title: DataTypes.STRING,
    genre: DataTypes.STRING,
    image: DataTypes.STRING,
    is_favorite: DataTypes.BOOLEAN,
    favorite_count: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER
  }, {});
  Sanstoon.associate = function(models) {
    // associations can be defined here
    Sanstoon.belongsTo(models.User, {
      as: 'author',
      foreignKey: 'created_by'
    })
  };
  return Sanstoon;
};