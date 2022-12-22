module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define("Context", {

        contextID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
       
        contextName: DataTypes.STRING(50),
        unitID: DataTypes.INTEGER,
        metricID: DataTypes.INTEGER,

        customMetricName: DataTypes.STRING(50),
        customMetricValue: DataTypes.DECIMAL(18, 10),
    });

    model.associate = models => {
        model.belongsTo(models.Unit, { foreignKey: 'unitID'});
        model.belongsTo(models.Metric, { foreignKey: 'metricID'});
    }

    return model;
};
