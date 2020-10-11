'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('crates', [
      {
        name: 'Clothes for Men',
        description: 'A monthly supply of trendy clothes for men.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Clothes for Women',
        description: 'A monthly supply of trendy clothes for women.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Accessories for Men',
        description: 'A monthly supply of trendy accessories for men',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Accessories for Women',
        description: 'A monthly supply of trendy accessories for women',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Clothes and Accessories for Men',
        description: 'A monthly supply of trendy clothes and accessories for men',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Clothes and Accessories for Women',
        description: 'A monthly supply of trendy clothes and accessories for women',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('crates', null, {});
  }
}

// I think that if we wind up needing to change a Crate (we were thinking that a Crate should somehow be connected to products, as in a Crate has many products), that this would have to be updated in here.
