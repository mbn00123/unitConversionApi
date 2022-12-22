module.exports = {
    up: (queryInterface, Sequelize) =>
      queryInterface.bulkInsert(
        'Metric',
        [
          {
            metricID: 1,
            metricName: 'm2',
            metricValue: 4046.856422,
            unitID: 1 //acre
          },
          {
            metricID: 2,
            metricName: 'metre',
            metricValue: 1609.344,
            unitID: 2 //mile
          },
          {
            metricID: 3,
            metricName: 'cm3',
            metricValue: 29.57353,
            unitID: 3 //fl oz.
          },
          {
            metricID: 4,
            metricName: 'm/s',
            metricValue: 0.44704,
            unitID: 4 //mph
          },
          {
            metricID: 5,
            metricName: 'km/s',
            metricValue: 0.000447,
            unitID: 4 //mph
          }
        ],
        {}
      ),
    down: (queryInterface, Sequelize) =>
      queryInterface.bulkDelete('Metric', null, {}),
  };