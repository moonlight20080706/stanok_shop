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
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status:{
      type: DataTypes.STRING,
    }
  });

  Card.associate = (models) => {
    // Card -> Category (ko‘p card 1 categoryga tegishli)
    Card.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "category",
    });

    // Card -> Cart (1 card ko‘p cartlarda bo‘lishi mumkin)
    Card.hasMany(models.Carts, {
      foreignKey: "card_id",
      as: "carts_card",
    });

    // Card -> Like (1 card ko‘p like'ga ega bo‘lishi mumkin)
    Card.hasMany(models.Like, {
      foreignKey: "card_id",
      as: "likes_card",
    });

    Card.belongsTo(models.Admin, {
      foreignKey: "admin_id",
      as: "admin",
    });
    
  };

  return Card;
};

