'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cart.belongsTo(models.user, { 
        as: "user",
        foreignKey: {
          name: "idUser",
        },
      }); 
      cart.belongsTo(models.product, {
        as: "product", 
        foreignKey: {
          name: "idProduct",
        },
      });
    
      // // cart belongs to many toping
      cart.belongsToMany(models.toping, {
        as: "toping",
        through: {
          model: "topingCart",
          as: "bridge",
        },
        foreignKey: "idCart",
      });

        // cart.hasMany(models.cartOrder, { 
      //   as: "cartOrder",
      //   foreignKey: {
      //     name: "idCart",
      //   },
      // }); 

    }
  };
  cart.init({
    idUser: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    idProduct: DataTypes.INTEGER,
    subtotal: DataTypes.INTEGER,
    // idTransaction: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cart',
  });
  return cart;
};