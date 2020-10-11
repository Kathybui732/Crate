'use strict'
// Use strict is to make sure code is executed in strict mode. Strict mode makes it so that you can't, for example use undeclared variables. It also makes it so using previously accepted "bad syntax" will now throw an error.

// module.exports makes it so the contents of this module can be used elsewhere - when you call it from elsewhere, everything in the module.exports would be able to be used in another file.

module.exports = function(sequelize, DataTypes) {
  let Crate = sequelize.define('crates', {
    // I'm not sure why sequelize is passed in as an argument, or what sequelize actually is in this case, or what it does, but the below defines what the attributes of a Crate are: name and description.
    // DataTypes is analagous to 't' in Rails - for example in the schema of a Crate in Ruby you would have t.string to say what type of datatype one of its attributes is.
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    }
  })

  // The below is similar to how you would define relationships in a Ruby model. A Crate has many subscriptions.

  Crate.associate = function(models) {
    Crate.hasMany(models.Subscription)
  }
// The below is what is returned after a Crate has been created using the attributes above.
  return Crate
}

// If we add the functionality of crates hasMany products, and products also hasMany crates, the crates would need to be able to tell which products it has. Here is where we'd define that a productID would need to be a non-required column on the crate table.
