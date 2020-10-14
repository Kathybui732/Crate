import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from '../../setup/schema/index'
import request from 'supertest'

describe('user queries', () => {
  let server;

  beforeAll(() => {
    server = express();

    server.use(
      '/',
      graphqlHTTP({
        schema: schema,
        graphql:false
      })
    )
  })

  // afterAll((done) => {
  //   server.close()
  //   done()
  // })

  it('can return all users', async () => {
    const response = await request(server)
      .get('/')
      .send({query: '{ users { email name } }'})
      .expect(200)
    expect(response.body.data.users.length).toEqual(2)
  })

  it('can log a user in and return a token', async () => {
    const response = await request(server)
      .get('/')
      .send({query: '{ userLogin(email: "user@crate.com", password: "123456", role: "user") { token user { id name email } } }'})
      .expect(200)

    expect(response.body.data.userLogin.user).toHaveProperty('id')
    expect(response.body.data.userLogin.user).toHaveProperty('email')
    expect(response.body.data.userLogin.user).toHaveProperty('name')
    expect(response.body.data.userLogin).toHaveProperty('token')

    const token = response.body.data.userLogin.token
  })

  it('can change a logged in users email', async () => {
    const tokenResponse = await request(server)
      .get('/')
      .send({query: '{ userLogin(email: "user@crate.com", password: "123456", role: "user") { token user { id name email } } }'})
    const token = tokenResponse.body.data.userLogin.token

    var query = `mutation userUpdate($email: String!) {
      userUpdate(email: $email, id: 1) {
        ...userFields
      }
    }
    fragment userFields on user {
      email
    }`;

    const response = await request(server)
      .post('/')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(JSON.stringify({
        query: query,
        variables: {
          input: {
            email: 'new@email.com'
          }
        }
      }))

    const emailResponse = await request(server)
      .get('/')
      .send({query: '{ userLogin(email: "new@email.com", password: "123456", role: "user") { token user { id name email } } }'})
      .expect(200)
    console.log(emailResponse.body)
  })
});
