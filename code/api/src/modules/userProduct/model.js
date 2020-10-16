'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProduct extends Model {

    static associate(models) {
    }
  };
  UserProduct.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserProduct',
  });
  UserProduct.associate = function(models) {
    UserProduct.belongsTo(models.User, {foreignKey: 'userId'})
    UserProduct.belongsTo(models.Product, {foreignKey: 'productId'})
  };
  return UserProduct;
};
