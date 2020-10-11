// SEE CRATE FOR MORE GENERAL ANNOTATIONS ANY DIFFERENT LINES ANNOTATED HERE

'use strict'

// Subscription - object relation
module.exports = function(sequelize, DataTypes) {
  let Subscription = sequelize.define('subscriptions', {
    userId: {
      type: DataTypes.INTEGER
    },
    crateId: {
      type: DataTypes.INTEGER
    }
  })

  Subscription.associate = function(models) {
    Subscription.belongsTo(models.User)
    // A subscription belongs to one user, a user has many subsriptions
    Subscription.belongsTo(models.Crate)
    // A subscription belongs to one crate, a user has many subsriptions
  }

  return Subscription
}
