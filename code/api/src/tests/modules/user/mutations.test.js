import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from '../../../setup/schema/index'
import request from 'supertest'
import models from "../../../setup/models"
const bcrypt = require('bcrypt');
const config = require('../../../config/server.json');
const User = require('../../../modules/user/model');

describe('user queries', () => {
  let server;

  beforeAll(() => {
    server = express();

    server.use(
      '/',
      graphqlHTTP({
        schema: schema,
        graphiql: false
      })
    )
  });

  beforeEach(async () => {
    const user1 = {
      name: "User",
      email: "user@crate.com",
      password: bcrypt.hashSync('123456', config.saltRounds),
      role: "user"
    }

    await models.User.create(user1)
  });

  afterEach(async () => {
    await models.User.destroy({ where: {} });
  });

  afterAll(() => {
    server.close();
  });

  it('can update a user with all info', async () => {
    const tokenResponse = await request(server)
      .get('/')
      .send({query: '{ userLogin(email: "user@crate.com", password: "123456", role: "user") { token user { id } } }'})
    const userID = tokenResponse.body.data.userLogin.user.id

    const updateResponse = await request(server)
      .post('/')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({ query: `mutation { userUpdate(id: ${userID}, email: "new@crate.com", streetAddress1: "123 New Lane", city: "Denver", state: "CO", zip: "80207", image: "image.jpg", description: "The only user") { id email streetAddress1 streetAddress2 city state zip description image } }` })
      .expect(200)
    expect(updateResponse.body.data.userUpdate).toHaveProperty('id')
    expect(updateResponse.body.data.userUpdate).toHaveProperty('email')
    expect(updateResponse.body.data.userUpdate).toHaveProperty('streetAddress1')
    expect(updateResponse.body.data.userUpdate).toHaveProperty('streetAddress2')
    expect(updateResponse.body.data.userUpdate).toHaveProperty('description')
    expect(updateResponse.body.data.userUpdate).toHaveProperty('city')
    expect(updateResponse.body.data.userUpdate).toHaveProperty('state')
    expect(updateResponse.body.data.userUpdate).toHaveProperty('zip')
    expect(updateResponse.body.data.userUpdate).toHaveProperty('image')
    expect(updateResponse.body.data.userUpdate.email).toEqual('new@crate.com')
  })

  it('can update a user with just email', async () => {
    const tokenResponse = await request(server)
      .get('/')
      .send({query: '{ userLogin(email: "user@crate.com", password: "123456", role: "user") { token user { id } } }'})
    const userID = tokenResponse.body.data.userLogin.user.id

    const updateResponse = await request(server)
      .post('/')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({ query: `mutation { userUpdate(id: ${userID}, email: "new@crate.com") { id email streetAddress1 streetAddress2 city state zip description image } }` })
      .expect(200)
    expect(updateResponse.body.data.userUpdate.email).toEqual('new@crate.com')
  })

  it('can update a user with just address', async () => {
    const tokenResponse = await request(server)
      .get('/')
      .send({query: '{ userLogin(email: "user@crate.com", password: "123456", role: "user") { token user { id } } }'})
    const userID = tokenResponse.body.data.userLogin.user.id

    const updateResponse = await request(server)
      .post('/')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({ query: `mutation { userUpdate(id: ${userID}, streetAddress1: "123 New Lane", city: "Denver", state: "CO", zip: "80207") { id email streetAddress1 streetAddress2 city state zip description image } }` })
      .expect(200)
    expect(updateResponse.body.data.userUpdate.streetAddress1).toEqual('123 New Lane')
    expect(updateResponse.body.data.userUpdate.streetAddress1).not.toEqual(null)
    expect(updateResponse.body.data.userUpdate.city).toEqual('Denver')
    expect(updateResponse.body.data.userUpdate.city).not.toEqual(null)
    expect(updateResponse.body.data.userUpdate.state).toEqual('CO')
    expect(updateResponse.body.data.userUpdate.state).not.toEqual(null)
    expect(updateResponse.body.data.userUpdate.zip).toEqual('80207')
    expect(updateResponse.body.data.userUpdate.zip).not.toEqual(null)
  })

  it('can update a user with description', async () => {
    const tokenResponse = await request(server)
      .get('/')
      .send({query: '{ userLogin(email: "user@crate.com", password: "123456", role: "user") { token user { id } } }'})
    const userID = tokenResponse.body.data.userLogin.user.id

    const updateResponse = await request(server)
      .post('/')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({ query: `mutation { userUpdate(id: ${userID}, description: "The only user") { id email streetAddress1 streetAddress2 city state zip description image } }` })
      .expect(200)
    expect(updateResponse.body.data.userUpdate.description).toEqual('The only user')
  })

  it('can update a user with image', async () => {
    const tokenResponse = await request(server)
      .get('/')
      .send({query: '{ userLogin(email: "user@crate.com", password: "123456", role: "user") { token user { id } } }'})
    const userID = tokenResponse.body.data.userLogin.user.id

    const updateResponse = await request(server)
      .post('/')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({ query: `mutation { userUpdate(id: ${userID}, image: "image.jpg") { id email streetAddress1 streetAddress2 city state zip description image } }` })
      .expect(200)
    expect(updateResponse.body.data.userUpdate.image).toEqual('image.jpg')
  })

  it('can update a user delivery date', async () => {
    const tokenResponse = await request(server)
      .get('/')
      .send({query: '{ userLogin(email: "user@crate.com", password: "123456", role: "user") { token user { id } } }'})
    const userID = tokenResponse.body.data.userLogin.user.id

    const updateResponse = await request(server)
      .post('/')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({ query: `mutation { userUpdate(id: ${userID}, deliveryDate: "15th" ) { id email streetAddress1 streetAddress2 city state zip description image deliveryDate } }` })
      .expect(200)
    console.log(updateResponse.body.data)
    expect(updateResponse.body.data.userUpdate.deliveryDate).toEqual('15th')
  })
});
