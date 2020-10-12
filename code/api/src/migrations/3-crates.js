// sequelize is a JS library that allows devs to map over protocol to create own CRUD methods
// assuming this is what's happening to create a crate
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('crates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('crates');
  }
}
