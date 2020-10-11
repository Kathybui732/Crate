'use strict'
// SEE CRATE FOR MORE GENERAL ANNOTATIONS ANY DIFFERENT LINES ANNOTATED HERE

// Product
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products', {
    name: {
      type: DataTypes.STRING
    },
    slug: {
      type: DataTypes.STRING
      // A slug is a unique string (typically a normalized version of title or other representative string), often used as part of a URL.
    },
    description: {
      type: DataTypes.TEXT
    },
    type: {
      type: DataTypes.INTEGER
      // type?? why are we specifying a type that is a integer value here? shirt type vs pants type?
    },
    gender: {
      type: DataTypes.INTEGER
      // M/F
    },
    image: {
      type: DataTypes.TEXT
    }
  })
}
