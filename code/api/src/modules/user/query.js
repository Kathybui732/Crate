// SEE CRATE FOR MORE GENERAL ANNOTATIONS ANY DIFFERENT LINES ANNOTATED HERE

// Imports
import { GraphQLInt, GraphQLString, GraphQLList } from 'graphql'
// We are importing these functions from 'graphql' library

// App Imports
import { UserType, UserLoginType, UserGenderType } from './types'
import { getAll, getById, login, getGenders } from './resolvers'
// importing the methods from these objects from other files within repo

// All - GET query for all users
export const users = {
  type: new GraphQLList(UserType),
  resolve: getAll
  // This is the resolver method
}

// By ID - i.e. GET method for a show
export const user = {
  type: UserType,
  args: {
    id: { type: GraphQLInt }
  },
  // takes in
  resolve: getById
}

// Auth - how to log in user just need name and password
export const userLogin = {
  type: UserLoginType,
  args: {
    email: {
      name: 'email',
      type: GraphQLString
    },

    password: {
      name: 'password',
      type: GraphQLString
    },

    role: {
      name: 'role',
      type: GraphQLString
    }
  },
  resolve: login
}

// Genders - to get the user's gender
export const userGenders = {
  type: new GraphQLList(UserGenderType),
  resolve: getGenders
}
