module.exports = (sequelize, DataTypes) =>{
    const Swipper = sequelize.define('Swipper', {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey : true
        },
        img:{
            type: DataTypes.STRING,
            allowNull: false 
        },
        desc:{
            type: DataTypes.STRING(50),
            allowNull: false
        }
    });
    
    return Swipper
}