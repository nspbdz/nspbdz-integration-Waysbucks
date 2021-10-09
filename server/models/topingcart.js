'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class topingCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  topingCart.init({
    idCart: DataTypes.INTEGER,
    idToping: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'topingCart',
  });
  return topingCart;
};