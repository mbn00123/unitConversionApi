module.exports = {
    up: (queryInterface, Sequelize) =>
      queryInterface.bulkInsert(
        'Unit',
        [
          {
            unitID: 1,
            unitName: 'acre',
            unitValue: 1
          },
          {
            unitID: 2,
            unitName: 'mile',
            unitValue: 1
          },{
            unitID: 3,
            unitName: 'fl oz.',
            unitValue: 1
          },{
            unitID: 4,
            unitName: 'mph',
            unitValue: 1
          }
        ],
        {}
      ),
    down: (queryInterface, Sequelize) =>
      queryInterface.bulkDelete('Unit', null, {}),
  };