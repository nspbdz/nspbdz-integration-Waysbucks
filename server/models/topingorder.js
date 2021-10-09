'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class topingOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  topingOrder.init({
    idOrder: DataTypes.INTEGER,
    idToping: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'topingOrder',
  });
  return topingOrder;
};