'use strict'

// User - This model is similar looking to the others. I believe the difference between a string and a text data type is that a string has a limit of 255 charactrs, and a text has a limit of ~30,000. In Googling, it looks like there is no performance difference for text vs. string in Postgres. There may be in other database types though.
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
      type: DataTypes.TEXT
    }
  })

  User.associate = function(models) {
    User.hasMany(models.Subscription)
  }

  return User
}

// In the above is where we would need to add some columns - a picture column, shipping address column and personal description column.
