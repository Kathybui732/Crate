// Imports
import jwt from 'jsonwebtoken'
// compact URL-safe means of representing claims to be transferred between two parties.
import serverConfig from '../config/server.json'
// this file gives up the port and secret env keys that we need - basically all the server info/configurations

// Authentication middleware
export default function (request, response, next) {
  let authToken = request.headers.authorization
  // authToken is a request we are making for an authorization

  if (authToken && authToken !== null) {
    // if auth token exists and the value is not null
    try {
      const token = authToken.split(' ')
      // break up string at all the spaces
      request.user = jwt.verify(token[1], serverConfig.secret)
      // verify that the token matches the secret?
    } catch (e) {
      console.warn('Invalid token detected.')
      // error handling - in case a token is no valid/not there
    }
  } else {
    request.user = {}
    // if an authorization token was not already assigned, we will request for one
  }

  next()
}
