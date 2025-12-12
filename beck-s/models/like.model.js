module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define("Like", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    card_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Like.associate = (models) => {
    // Har bir Like faqat bitta Card'ga tegishli
    Like.belongsTo(models.Card, {
      foreignKey: "card_id",
      as: "likes_card",
    });
  };

  return Like;
};
