module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Unit', {
      unitID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      unitName: {
        type: Sequelize.STRING(50),
      },
      unitValue: {
        type: Sequelize.DECIMAL(18,10)
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Unit');
  },
};