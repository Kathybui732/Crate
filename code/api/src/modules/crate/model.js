'use strict'

// The purpose of "use strict" is to indicate that the code should be executed in "strict mode" from ECMAScript version 5.

module.exports = function(sequelize, DataTypes) {
  let Crate = sequelize.define('crates', {
     // This is like the blend of a model file and the scheme
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    }
  })

  Crate.associate = function(models) {
    // i.e. the has_many/belongs_to to build the relationship between other objects
    Crate.hasMany(models.Subscription)
    // a Crate had many subscriptions, one to many relationship
  }

  return Crate
  // When you require this file, it will return a Crate
}