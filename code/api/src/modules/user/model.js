'use strict'

// User
module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define('users', {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.TEXT
    },
    password: {
      type: DataTypes.TEXT
    },
    role: {
      type: DataTypes.TEXT,
      defaultValue: 'USER'
    },
    image: {
      type: DataTypes.TEXT
    },
    streetAddress1: {
      type: DataTypes.STRING
    },
    streetAddress2: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    },
    zip: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    deliveryDate: {
      type: DataTypes.STRING,
      defaultValue: '1st'
    }
  })

  User.associate = function(models) {
    User.hasMany(models.Subscription);
    User.belongsToMany(models.Product, {through: 'UserProduct', foreignKey: 'productId', as: 'products'});
  }
  return User
}
