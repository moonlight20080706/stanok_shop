module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        cat_name: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        }
    });

    Category.associate = (models) => {
        Category.hasMany(models.Card, {
            foreignKey: "category_id",
            as: "cards"
        });
    };

    return Category;
};
