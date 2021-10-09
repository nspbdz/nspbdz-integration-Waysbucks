'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction.belongsTo(models.user, { 
        as: "user",
        foreignKey: {
          name: "idUser",
        },
      }); 

      transaction.hasMany(models.order, { 
        as: "order",
        foreignKey: {
          name: "idTransaction",
        },
      }); 

    }
  };
  transaction.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    postCode: DataTypes.INTEGER,
    status: DataTypes.STRING,
    address: DataTypes.STRING,
    attachment: DataTypes.STRING,
    idUser: DataTypes.INTEGER,
    total:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};