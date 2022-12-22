module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Context', {
            contextID: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            contextName: {
                type: Sequelize.STRING(50),
            },
            customMetricName: {
                type: Sequelize.STRING(50),
            },
            customMetricValue: {
                type: Sequelize.DECIMAL(18, 10)
            },

            unitID: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Unit',
                    key: 'unitID',
                },
            },
            metricID: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Metric',
                    key: 'metricID',
                },
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Context');
    },
};