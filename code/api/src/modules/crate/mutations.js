// Imports
// We need to import certain functionality from the graphql package that would allow us to use some of those functions.
import { GraphQLString, GraphQLInt } from 'graphql'

// App Imports
// These are imported below to be able to utilize functions/methods from elsewhere in the app.
import CrateType from './types'
import { create, remove, update } from './resolvers'

// Crate create
// The below methods for CUD is also what is exported when this query is queried. I wonder why the ID not not returned when a crate is created? It's interesting that the type has to be specified here as well. In Ruby you don't have to say "return to me a Crate type object".
export const crateCreate = {
  type: CrateType,
  args: {
    name: {
      name: 'name',
      type: GraphQLString
    },

    description: {
      name: 'description',
      type: GraphQLString
    }
  },
  resolve: create
}

// Crate update
export const crateUpdate = {
  type: CrateType,
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
    }
  },
  resolve: update
}

// Crate remove
export const crateRemove = {
  type: CrateType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
}
