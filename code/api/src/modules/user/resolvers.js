// Resolver is a collection of functions that generate response for a GraphQL query. In simple terms, a resolver acts as a GraphQL query handler. Every resolver function in a GraphQL schema accepts four positional arguments as given below −
//
// fieldName:(root, args, context, info) => { result }

// Imports
import bcrypt from 'bcrypt'
// bycrypt to encrypt password
import jwt from 'jsonwebtoken'
// to assign a user a token after logging in to use to authenticate and allow them to access different info

// App Imports
import serverConfig from '../../config/server'
import params from '../../config/params'
import models from '../../setup/models'

// Create
export async function create(parentValue, { name, email, password }) {
  // Users exists with same email check
  const user = await models.User.findOne({ where: { email } })
  // looks up email to see if it exists

  if (!user) {
    // User does not exists
    const passwordHashed = await bcrypt.hash(password, serverConfig.saltRounds)
    // if it doesn't exist, then create the encryption for the password

    return await models.User.create({
      name,
      email,
      password: passwordHashed
    })
    // once we've checked for the email uniqueness and encrypted their password, we can create that user
  } else {
    // User exists - if email already exists in the system, return this:
    throw new Error(`The email ${ email } is already registered. Please try to login.`)
  }
}

export async function login(parentValue, { email, password }) {
  const user = await models.User.findOne({ where: { email } })

  if (!user) {
    // User does not exists - if email isnt registered in server
    throw new Error(`We do not have any user registered with ${ email } email address. Please signup.`)
  } else {
    const userDetails = user.get()

    // User exists - else we look up the user with the email
    const passwordMatch = await bcrypt.compare(password, userDetails.password)
    // compare the password to see if it matches the one encrypted one in system

    if (!passwordMatch) {
      // Incorrect password - if passwords do not match throw this error
      throw new Error(`Sorry, the password you entered is incorrect. Please try again.`)
    } else {
      // else we log them in and give them their token to be used by the sessions
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
