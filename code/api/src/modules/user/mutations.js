// Imports
import { GraphQLString, GraphQLInt } from 'graphql'

// App Imports
import { UserType } from './types'
import { create, remove, update } from './resolvers'

// Create
export const userSignup = {
  type: UserType,
  args: {
    name: {
      name: 'name',
      type: GraphQLString
    },

    email: {
      name: 'email',
      type: GraphQLString
    },

    password: {
      name: 'password',
      type: GraphQLString
    }
  },
  resolve: create
}

// Remove
export const userRemove = {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
}

// Update
export const userUpdate = {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    },

    name: {
      name: 'name',
      type: GraphQLString
    },

    description: {
      name: 'description',
      type: GraphQLString
    },

    streetAddress1: {
      name: 'streetAddress1',
      type: GraphQLString
    },

    streetAddress2: {
      name: 'streetAddress2',
      type: GraphQLString
    },

    city: {
      name: 'city',
      type: GraphQLString
    },

    state: {
      name: 'state',
      type: GraphQLString
    },

    zip: {
      name: 'zip',
      type: GraphQLString
    },

    image: {
      name: 'image',
      type: GraphQLString
    },

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
    },

    deliveryDate: {
      name: 'deliveryDate',
      type: GraphQLString
    }
  },
  resolve: update
}
