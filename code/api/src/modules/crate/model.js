'use strict'

module.exports = function(sequelize, DataTypes) {
  let Crate = sequelize.define('crates', {
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    }
  })

  // This code defines the frelationship between crates and subscriptions- here, we see that a crate can have many subscriptions.
  Crate.associate = function(models) {
    Crate.hasMany(models.Subscription)
  }

  return Crate
}

// For our track, we need to know what items are in each crate. If we add functionality for crates hasMany products, and also product hasMany crates, crates would also need to be able to know what products it has. Here, we'll definte that a productId is non-required column on the table crate.