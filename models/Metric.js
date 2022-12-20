module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define("Metric", {

        metricID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
       
        metricName: DataTypes.STRING(50),      
        metricValue: DataTypes.DECIMAL(18, 10),
        unitID: DataTypes.INTEGER
    });

    model.associate = models => {
        model.belongsTo(models.Unit, { foreignKey: 'unitID'});
    }

    return model;
};
