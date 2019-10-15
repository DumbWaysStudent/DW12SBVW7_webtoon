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
    return queryInterface.bulkInsert('Pages', [
      {
        page: 1,
        image: 'https://swebtoon-phinf.pstatic.net/20181022_21/1540186270989s9r5s_JPEG/1540186270951146618.jpg',
        episode_id: 1
      },
      {
        page: 2,
        image: 'https://swebtoon-phinf.pstatic.net/20181022_158/1540186271082bpGaO_JPEG/1540186271043146611.jpg',
        episode_id: 1
      },
      {
        page: 3,
        image: 'https://swebtoon-phinf.pstatic.net/20181022_150/1540186271089G0Qwc_JPEG/1540186271070146613.jpg',
        episode_id: 1
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
    return queryInterface.bulkDelete('Pages', null, {});
  }
};
