'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserProducts', [
      {
        userId: '2',
        productId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: '2',
        productId: '2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: '2',
        productId: '3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: '2',
        productId: '4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: '2',
        productId: '5',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: '2',
        productId: '6',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: '2',
        productId: '7',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: '2',
        productId: '8',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserProducts', null, {});
  }
}
