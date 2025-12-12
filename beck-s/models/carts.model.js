module.exports = (sequelize,DataTypes) =>{
    const Carts = sequelize.define('Carts',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        card_id:{
            type:DataTypes.INTEGER
        }
    })
    
    Carts.associate = (models) => {
        Carts.belongsTo(models.Card, {
            foreignKey: 'card_id',
            as: 'carts_card'
        });
  };


    return Carts
}