'use strict';
module.exports = (sequelize, DataTypes) => {
  const Episode = sequelize.define('Episode', {
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    sanstoon_id: DataTypes.INTEGER
  }, {});
  Episode.associate = function(models) {
    // associations can be defined here
    Episode.belongsTo(models.Sanstoon, {
      foreignKey: 'sanstoon_id'
    });
  };
  return Episode;
};