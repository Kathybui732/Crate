// Imports
import { GraphQLInt, GraphQLString, GraphQLList } from 'graphql'

// App Imports
import { UserType, UserLoginType, UserGenderType } from './types'
import { getAll, getById, login, getGenders } from './resolvers'

// All
export const users = {
  type: new GraphQLList(UserType),
  resolve: getAll
  // This is the resolver method
}

// By ID
export const user = {
  type: UserType,
  args: {
    id: { type: GraphQLInt }
  },
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

// Genders - gets gender
export const userGenders = {
  type: new GraphQLList(UserGenderType),
  resolve: getGenders
}
