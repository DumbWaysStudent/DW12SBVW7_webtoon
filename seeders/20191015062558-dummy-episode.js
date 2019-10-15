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
    return queryInterface.bulkInsert('Episodes', [
      {
        title: 'Ep. 1',
        image: 'https://swebtoon-phinf.pstatic.net/20181017_245/1539764585755Y622w_PNG/thumb_1539764560109146619.png',
        sanstoon_id: 1,
      },
      {
        title: 'Ep. 2',
        image: 'https://swebtoon-phinf.pstatic.net/20181018_161/1539842731258qSbir_PNG/thumb_1539842676363146629.png',
        sanstoon_id: 1,
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
   return queryInterface.bulkDelete('Episodes', null, {});
  }
};
