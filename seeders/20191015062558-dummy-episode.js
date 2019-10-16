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
    return queryInterface.bulkInsert(
      'Episodes',
      [
        {
          title: 'Ep. 1',
          image:
            'https://swebtoon-phinf.pstatic.net/20140617_248/1403004901360ABk5x_JPEG/tower_000.jpg',
          sanstoon_id: 1,
        },
        {
          title: 'Ep. 2',
          image:
            'https://swebtoon-phinf.pstatic.net/20140617_295/14030049099507m9Vb_JPEG/tower_001.jpg',
          sanstoon_id: 1,
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Episodes', null, {});
  },
};
