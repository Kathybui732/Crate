'use strict'
// The purpose of "use strict" is to indicate that the code should be executed in "strict mode" from ECMAScript version 5.
// Strict mode changes previously accepted "bad syntax" into real errors. 
// As an example, in normal JavaScript, mistyping a variable name creates a new global variable.
// In strict mode, this will throw an error, making it impossible to accidentally create a global variable.  
// In normal JavaScript, a developer will not receive any error feedback assigning values to non-writable properties.  
// In strict mode, any assignment to a non-writable property, a getter-only property, a non-existing property, a non-existing variable, or a non-existing object, will throw an error.

// MODEL file is where the ORM occurs && this is like the relationships part of a rails app where we define the relations this object has

module.exports = function(sequelize, DataTypes) {
  // module.exports allows you to import this file(require) anywhere else within the repo
  // takes in squelize and DataTypes
  let Crate = sequelize.define('crates', {
    // This is like the blend of a model file and the scheme
    // sequilize is in charge of building the object relation - So here it assigns the Crate object to having these attributes of name and description and these attributes have this datatype.
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
