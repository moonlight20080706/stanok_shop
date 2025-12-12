const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define("Admin", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ad_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("super_admin", "admin"),
      allowNull: false,
      defaultValue: "admin",
    },
    invite_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_used: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  Admin.beforeSave(async (ad) => {
    if (ad.changed("password") && ad.is_used === true) {
      ad.password = await bcrypt.hash(ad.password, 10);
    }
  });

  
  Admin.associate = (models) => {
    Admin.hasMany(models.Card, {
      foreignKey: "admin_id",
      as: "card",
    });
  };

  return Admin;
};
