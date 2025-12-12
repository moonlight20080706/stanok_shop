module.exports = (sequelize, DataTypes) => {
  const Info = sequelize.define("Info", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING(),
      allowNull: false,
    }
  });

 
    

  return Info;
};

