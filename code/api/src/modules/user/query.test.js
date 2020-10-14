import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from '../../setup/schema/index'
import request from 'supertest'

const User = require('./model');

describe('user queries', () => {
  let server;

  beforeAll(() => {
    server = express();

    server.use(
      '/',
      graphqlHTTP({
        schema: schema,
        graphql: false
      })
    )
  })

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

  it('can change a logged in users email', async () => {
    const tokenResponse = await request(server)
      .get('/')
      .send({query: '{ userLogin(email: "user@crate.com", password: "123456", role: "user") { token user { id name email } } }'})

    const token = tokenResponse.body.data.userLogin.token

    const userID = tokenResponse.body.data.userLogin.user.id

    const query = `mutation userUpdate($email: String!) {
      userUpdate(email: $email, id: 2) {
        ...userFields
      }
    }
    fragment userFields on user {
      email
    }`;
    const variables = {
      "email": 'new@email.com'
    }

    const response = await request(server)
      .patch('/')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({query: query, variables})
      .expect(200)

    const updateResponse = await request(server)
      .get('/')
      .send({query: '{ user(id: 2) { email} }'})
      .get('/')
      .send({query: '{ user(id: 2) { email} }'})
    console.log(updateResponse.body.data)
  })

  // it('can create a user', async () => {
  //   const signup = `mutation userSignup($name: String!, $email: String!, $password: String) {
  //     userSignup(name: $name, email: $email, password: $password){
  //       ...userFields
  //     }
  //   }
  //   fragment userFields on user {
  //     name
  //     email
  //     password
  //   }`;
  //   const variables = {
  //     "name": "test",
  //     "email": "test@crate.com",
  //     "password": "123456"
  //   };
  //
  //   const createResponse = await request(server)
  //     .post('/')
  //     .send({ query: signup, variables })
  //     .expect(200)
  //     expect(createResponse.body.data.userSignup).toHaveProperty('password')
  //     expect(createResponse.body.data.userSignup).toHaveProperty('email')
  //     expect(createResponse.body.data.userSignup).toHaveProperty('name')
  // })
});
