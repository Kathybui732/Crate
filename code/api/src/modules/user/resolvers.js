// Imports - In Rails, bcrypt is used in the model file where you call 'has_secure_password', but it looks like this encryption takes place in this file.
// JWT is an open standard that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed.
// The main usage for JWT in the case of this app is authorization. Once the user is logged in, each subsequent request will include the JWT, allowing the user to perform functions which are permitted with the presence of the token. It's a way a user still perform the actions they want to without having to log in every time or use a session like in Rails.
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// App Imports
import serverConfig from '../../config/server'
import params from '../../config/params'
import models from '../../setup/models'

// Create - After researching async, it looks like await is a keyword associated with it. What that pair is is essentially syntactic sugar on top of Promises, making asynchronous code easier to write and read.
// One of the traits of an async function is that their return values are guaranteed to be converted to promises. A Promise is an object that may produce a single value some time in the future: either a resolved value, or a reason that it's not resolved (such as if an error occured).
// A promise may be either fulfilled, rejected, or pending. They are also eager, meaning a promise will start doing whatever task it is given as soon as the promise constructor is evoked.
// I'm not sure why this function (and others) need to be asynchronous. Maybe it helps by on the one hand (in the example below) searching for a user, and then at the same time also creating a user.
export async function create(parentValue, { name, email, password }) {
  // Users exists with same email check
  const user = await models.User.findOne({ where: { email } })

  if (!user) {
    // User does not exists
    const passwordHashed = await bcrypt.hash(password, serverConfig.saltRounds)

    return await models.User.create({
      name,
      email,
      password: passwordHashed
    })
  } else {
    // User exists
    throw new Error(`The email ${ email } is already registered. Please try to login.`)
  }
}

export async function login(parentValue, { email, password }) {
  const user = await models.User.findOne({ where: { email } })

  if (!user) {
    // User does not exists
    throw new Error(`We do not have any user registered with ${ email } email address. Please signup.`)
  } else {
    const userDetails = user.get()

    // User exists
    const passwordMatch = await bcrypt.compare(password, userDetails.password)

    if (!passwordMatch) {
      // Incorrect password - I thought a good way to handle authorization errors is to not tell the user what is incorrect about their login attempt, which would not give them information about what is the problem.
      throw new Error(`Sorry, the password you entered is incorrect. Please try again.`)
    } else {
      const userDetailsToken = {
        id: userDetails.id,
        name: userDetails.name,
        email: userDetails.email,
        role: userDetails.role
      }

      return {
        user: userDetails,
        token: jwt.sign(userDetailsToken, serverConfig.secret)
      }
    }
  }
}

// Get by ID
export async function getById(parentValue, { id }) {
  return await models.User.findOne({ where: { id } })
}

// Get all
export async function getAll() {
  return await models.User.findAll()
}

// Delete
export async function remove(parentValue, { id }) {
  return await models.User.destroy({ where: { id } })
}

// User genders
export async function getGenders() {
  return Object.values(params.user.gender)
}

// Here is where we'd control for the new queries/mutations, checking first if a user is authorized to make those changes. The queries/mutations are CRUD functionality for a user's picture, shipping address, personal description and email.
