import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from '../../setup/schema/index'
import request from 'supertest'
// import db from '../../setup/database'
import models from "../../setup/models"
const bcrypt = require('bcrypt');
const config = require('../../config/server.json');

const User = require('./model');

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
  //
  afterEach(async () => {
    await models.User.destroy({ where: {} });
  });

  afterAll(() => {
      server.close();
  });

  // afterAll((done) => {
  //   server.close()
  //   done()
  // })

  // it('can return all users', async () => {
  //   const response = await request(server)
  //     .get('/')
  //     .send({query: '{ users { email name } }'})
  //     .expect(200)
  //   expect(response.body.data.users.length).toEqual(2)
  // })
  //
  // it('can log a user in and return a token', async () => {
  //   const response = await request(server)
  //     .get('/')
  //     .send({query: '{ userLogin(email: "user@crate.com", password: "123456", role: "user") { token user { id name email } } }'})
  //     .expect(200)
  //
  //   expect(response.body.data.userLogin.user).toHaveProperty('id')
  //   expect(response.body.data.userLogin.user).toHaveProperty('email')
  //   expect(response.body.data.userLogin.user).toHaveProperty('name')
  //   expect(response.body.data.userLogin).toHaveProperty('token')
  // })

  // it('can change a logged in users email', async () => {
  //   const tokenResponse = await request(server)
  //     .get('/')
  //     .send({query: '{ userLogin(email: "user@crate.com", password: "123456", role: "user") { token user { id name email } } }'})
  //
  //   const token = tokenResponse.body.data.userLogin.token
  //
  //   const userID = tokenResponse.body.data.userLogin.user.id
  //
  //   const query = `mutation userUpdate($email: String!) {
  //     userUpdate(email: $email, id: 2) {
  //       ...userFields
  //     }
  //   }
  //   fragment userFields on user {
  //     email
  //   }`;
  //   const variables = {
  //     "email": 'new@email.com'
  //   }
  //
  //   const response = await request(server)
  //     .patch('/')
  //     .set('Authorization', `Bearer ${token}`)
  //     .set('Content-Type', 'application/json')
  //     .set('Accept', 'application/json')
  //     .send({query: query, variables})
  //     .expect(200)
  //
  //   const updateResponse = await request(server)
  //     .get('/')
  //     .send({query: '{ user(id: 2) { email} }'})
  //     .get('/')
  //     .send({query: '{ user(id: 2) { email} }'})
  //   console.log(updateResponse.body.data)
  // })

  it('can create a user', async () => {
    // const user1 = {
    //     name: "User",
    //     email: "user@crate.com",
    //     password: bcrypt.hashSync('123456', config.saltRounds),
    //     role: "user"
    // }
    //
    // models.User.create(user1)
    // const signup = `mutation userSignup($name: String!, $email: String!, $password: String) {
    //   userSignup(name: $name, email: $email, password: $password){
    //     ...userFields
    //   }
    // }
    // fragment userFields on user {
    //   name
    //   email
    //   password
    // }`;
    // const variables = {
    //   "name": "test",
    //   "email": "test@crate.com",
    //   "password": "123456"
    // };

    // const createResponse = await request(server)
    //   .post('/admin/user/update')
    //   .send({ query: signup, variables: variables })
    //   .expect(200)
    //   // expect(createResponse.body.data.userSignup).toHaveProperty('password');
    //   // expect(createResponse.body.data.userSignup).toHaveProperty('email');
    //   // expect(createResponse.body.data.userSignup).toHaveProperty('name');
    // console.log(createResponse.body.data)

    const tokenResponse = await request(server)
      .get('/')
      .send({query: '{ userLogin(email: "user@crate.com", password: "123456", role: "user") { token user { id name email } } }'})

    // const token = tokenResponse.body.data.userLogin.token
    console.log(tokenResponse.body)
    const userID = tokenResponse.body.data.userLogin.user.id

    // const query = `mutation userUpdate($streetAddress1: String!) {
    //   userUpdate(streetAddress1: $streetAddress1, id: ${userID}) {
    //     ...userFields
    //   }
    // }
    // fragment userFields on user {
    //   streetAddress1
    // }`;
    // const variables_2 = {
    //   "streetAddress1": '123 New lane'
    // }

    const updateResponse = await request(server)
      .post('/')
      // .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      // .send({query: query, variables_2})
      .send({ query: `mutation { userUpdate(id: ${userID}, email: "YoungAndHip@aol.com", streetAddress1: "123 New Lane", city: "Denver", state: "CO", zip: "80207" ) { id email } }` })
      .expect(200)
    console.log(updateResponse.body)
  })
});
