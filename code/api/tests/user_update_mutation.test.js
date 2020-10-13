import request from 'supertest'
import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from '../src/setup/schema/index'

// const update = require('../src/modules/user/mutations.js');

// export const userLogin = {
//   type: UserLoginType,
//   args: {
//     email: {
//       name: 'email',
//       type: GraphQLString
//     },
//
//     password: {
//       name: 'password',
//       type: GraphQLString
//     },
//
//     role: {
//       name: 'role',
//       type: GraphQLString
//     }
//   },
//   resolve: login
// }

// {
//   userLogin(email: "j@t.com", password: "passmethepassword", role: "") {
//     token
//     user {
//       id
//       name
//       email
//     }
//   }
// }

describe('user update', () => {
  let server;
  beforeAll(() => {
    server = express();

    server.use(
      '/',
      graphqlHTTP({
        schema:schema,
        graphiql:false
      })
    );
  });

  test('returns updated user information in the response', async () => {
    const response = await request(server)
    .post('/')
    .send({
      query:' { userLogin(email: "user@crate.com", password: "123456", role: "user") { token } } '
    });
    let token = response.body.data.userLogin.token;
    // console.log(token);

    const response2 = await request(server)
    .post('/')
    .set("bearer",token)
    .send({
      query:' mutation userUpdate($email: String!) { userUpdate(email:$email, id:2) {email} } ',
      variables: {
        "email":"newuser@crate.com"
      }
    });
    console.log(response2.body);

    // .expect(200)
    // expect(update.type).toBe(UserType);

  });
});

// Note: BE has unproductively struggled on this for a while, not knowing how to write a test but feeling like we can write the code.

// Note 2 10-13-20 @ 5:30 PM - we've been struggling with getting the syntax of the mutation above for a while. We think the problem is how we're working the mutation.
