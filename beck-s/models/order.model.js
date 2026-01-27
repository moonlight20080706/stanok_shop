module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    customerTelegramId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },

    customerUsername: {
      type: DataTypes.STRING,
      allowNull: true
    },

    products: {
      type: DataTypes.JSON,
      allowNull: false
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: "new"
    }
  });

  return Order;
};
