'use strict';

const bcrypt = require('bcrypt');
const config = require('../config/server.json');
const params = require('../config/params.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'The Admin',
        email: 'admin@crate.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        role: params.user.roles.admin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'The User',
        email: 'user@crate.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        role: params.user.roles.user,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
}

// I imagine in an app that is real, this sort of file where users are seeded and their passwords are open to see would be at the minimum git ignored.
// I am unsure about much of the syntax of this file, but it looks to just be where the users are seeded in the database.
// I looked up what saltRounds is, and it's a function of bcrypt that essentially adds layers of complexity to something with each round of saltRounds. A higher saltRounds value ensures more complex and secure hashes. However, very high salt rounds results in a bad user experience as it takes that much more time to secure the password. In our case, the number of salt rounds is defined in the server.json file, and it's 10.
