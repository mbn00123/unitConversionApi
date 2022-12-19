module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define("Context", {

        ContextId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
       
        contextName: DataTypes.STRING(50),
        countryID: DataTypes.STRING(2),   
        unitID: DataTypes.INTEGER,
        metricID: DataTypes.INTEGER,

        customMetricName: DataTypes.STRING(50),
        customMetricValue: DataTypes.DECIMAL(18, 2),
    });

    model.associate = models => {
        model.belongsTo(models.Unit, { foreignKey: 'unitID'});
        model.belongsTo(models.Metric, { foreignKey: 'metricID'});
    }

    return model;
};
