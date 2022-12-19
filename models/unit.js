module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define("Unit", {

        unitId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
       
        unitName: DataTypes.STRING(50),      
        unitValue: DataTypes.Decimal(18, 2)
    });

    return model;
};
