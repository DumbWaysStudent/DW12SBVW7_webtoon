'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Sanstoons', [
      {
        title: 'Tower of God',
        genre: 'Fantasy',
        image: 'https://www.larutadelsorigens.cat/wallpic/full/100-1001227_previous-one-bam-tower-of-god.jpg',
        created_by: 1,
      },
      {
        title: 'Age Matters',
        genre: 'Romance',
        image: 'https://i.ytimg.com/vi/5_y779pl-_Y/maxresdefault.jpg',
        created_by: 1,
      }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Sanstoons', null, {});
  }
};
