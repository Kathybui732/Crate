'use strict'

// Product - this is a basic definition of a Product object. We could add a column called deliveryStatus here, for delivered, returned or shipped. And also deliveryDate, which the user can then update. We'd need to associate a product with a crate and subscription first however. And maybe also a user to a product.
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products', {
    name: {
      type: DataTypes.STRING
    },
    slug: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    type: {
      type: DataTypes.INTEGER
    },
    gender: {
      type: DataTypes.INTEGER
    },
    image: {
      type: DataTypes.TEXT
    }
  })
}
