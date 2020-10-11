// Imports
import { GraphQLInt, GraphQLString, GraphQLList } from 'graphql'
// GraphQLList - A list is a kind of type marker, a wrapping type which points to another type. Lists are often created within the context of defining the fields of an object type.
// GraphQL list represents a sequence of values. It is possible to view these values as arrays (e.g. in Javascript), although the analogy is not completely precise.

// App Imports
import CrateType from './types'
import { getAll, getById } from './resolvers'

// Crates All - a GET request for all the crates
// we can call the const crates to get back this list
export const crates = {
  type: new GraphQLList(CrateType),
  // the type that is returned from crates is a graphql list of crates
  args: {
    orderBy: { type: GraphQLString }
    // This will order by which field you want and then asc or desc like { createdAt: asc }
  },
  resolve: getAll
  // get all crates resolver method from resolver.js
}

// Crate By ID - i.e. a GET request for crate show
export const crateById = {
  type: CrateType,
  args: {
    crateId: { type: GraphQLInt }
  },
  // takes inthe arguement of the crate's ID
  resolve: getById
  // gets a single crate that matches ID requested
}
