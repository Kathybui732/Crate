// set of instructions for how to build the database

module.exports = {
  // up is building up the db with the ORM
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      // make a user table with these features:
      id: {
        allowNull: false,
        // cannot be null
        autoIncrement: true,
        // increment evenly 1,2,3,4,5,6,7
        primaryKey: true,
        // the id is the promary key
        type: Sequelize.INTEGER
        // the datatype will be an integer when we use it
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.TEXT
      },
      password: {
        type: Sequelize.TEXT
      },
      role: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        // needs to have created date
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        // needs to have updated date
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
  // after the migration builds the table, it needs down instructions to tell it what to do with it after
}
