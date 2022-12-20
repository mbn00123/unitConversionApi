module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Metric', {
            metricID: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            metricName: {
                type: Sequelize.STRING(50),
            },
            metricValue: {
                type: Sequelize.DECIMAL(18, 10)
            },
            unitID: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Unit',
                    key: 'unitID',
                },
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Metric');
    },
};