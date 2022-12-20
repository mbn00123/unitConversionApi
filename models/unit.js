module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define("Unit", {

        unitID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
       
        unitName: DataTypes.STRING(50),      
        unitValue: DataTypes.DECIMAL(18, 10)
    });

    return model;
};
