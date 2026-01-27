module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define("Card", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    currency: {
    type: DataTypes.ENUM('UZS', 'USD'), // valyuta
    allowNull: false,
    defaultValue: 'UZS'
  },
    quantity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
  });

  Card.associate = (models) => {
    // Card -> Category (ko‘p card 1 categoryga tegishli)
    Card.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "category",
    });

   
    Card.belongsTo(models.Admin, {
      foreignKey: "admin_id",
      as: "admin",
    });
  };

  return Card;
};
