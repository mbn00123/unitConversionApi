module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define("Metric", {

        metricId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
       
        metricName: DataTypes.STRING(50),      
        metricValue: DataTypes.DECIMAL(18, 2),
        unitId: DataTypes.INTEGER
    });

    model.associate = models => {
        model.belongsTo(models.Unit, { foreignKey: 'unitID'});
    }

    return model;
};
