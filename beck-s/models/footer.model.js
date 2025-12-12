module.exports = (sequelize, DataTypes) => {
    const Footer = sequelize.define('Footer', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telegram_email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Footer;
};
