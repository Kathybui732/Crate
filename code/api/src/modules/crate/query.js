// Imports
import { GraphQLInt, GraphQLString, GraphQLList } from 'graphql'

// App Imports
import CrateType from './types'
import { getAll, getById } from './resolvers'

// Crates All - a GET request for all the crates
// we can call the const crates to get back this list
export const crates = {
  type: new GraphQLList(CrateType),
  args: {
    orderBy: { type: GraphQLString }
    // This will order by which field you want and then asc or desc like { createdAt: asc }
  },
  resolve: getAll
  // get all crates resolver method from resolver.js
}

// Crate By ID
export const crateById = {
  type: CrateType,
  args: {
    crateId: { type: GraphQLInt }
  },
   // takes in the argument of the crate's ID
  resolve: getById
  // gets a single crate that matches ID requested
}
