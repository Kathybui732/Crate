'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserProducts', [
      {
        userId: '2',
        productId: '1',
        status: 'RETURNED',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: '2',
        productId: '2',
        status: 'KEPT',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: '2',
        productId: '3',
        status: 'RETURNED',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: '2',
        productId: '4',
        status: 'KEPT',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: '2',
        productId: '5',
        status: 'RETURNED',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: '2',
        productId: '6',
        status: 'KEPT',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: '2',
        productId: '7',
        status: 'RETURNED',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: '2',
        productId: '8',
        status: 'KEPT',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserProducts', null, {});
  }
}
