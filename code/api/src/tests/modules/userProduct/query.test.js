import express form 'express'
import graphqlHTTP from 'express-graphql'
import schema from '../../../setup/schema/index'
import request from 'supertest'
import models from '../../../setup/models'
const User = require '../../../modules/user/model'

describe('userProduct queries', () => {
  let server;

  beforeAll(async () => {
    server = express();

    server.use(
      '/',
      graphqlHTTP({
        schema: schema,
        graphiql = false
      })
    )

    const user = {
      name: "User",
      email: "user@crate.com",
      password: bcrypt.hashSync('123456', config.saltRounds),
      role: "user"
    }
    await models.User.create(user)

    const userProduct1 = {
      userId: '2',
      productId: '1',
      status: 'RETURNED',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const userProduct2 = {
      userId: '2',
      productId: '2',
      status: 'KEPT',
      createdAt: new Date(),
      updatedAt: new Date()
    }

  });
  //
  // beforeEach(async () => {
  //
  // });
  //
  // afterEach(async () => {
  // });

  afterAll(() => {
    await models.User.destroy({ where: {} });
    server.close();
  });
});
