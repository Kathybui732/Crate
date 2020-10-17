import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from '../../../setup/schema/index'
import request from 'supertest'
import models from '../../../setup/models'
const User = require('../../../modules/user/model');
const UserProduct = require('../../../modules/userProduct/model');

describe('userProduct queries', () => {
  let server;

  beforeAll(async () => {
    server = express();

    server.use(
      '/',
      graphqlHTTP({
        schema: schema,
        graphiql: false
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
    await models.UserProduct.create(userProduct1)
    await models.UserProduct.create(userProduct2)
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
    await models.UserProduct.destroy({ where: {} });
    server.close();
  });

  it('can update a user with all info', async () => {
    const tokenResponse = await request(server)
      .get('/')
      .send({query: '{ userLogin(email: "user@crate.com", password: "123456", role: "user") { token user { id } } }' })
    const userID = tokenResponse.body.data.userLogin.user.id

    const updateResponse = await request(server)
      .post('/')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({ query: `query MyQuery { productsByUser { product { description gender id image name slug type } } }` })
      .expect(200)
      console.log(updateResponse)
  })
});
