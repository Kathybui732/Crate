// Imports
import { GraphQLInt, GraphQLString, GraphQLList } from 'graphql'
// What is a GraphQLList? From Googling, that looks to be a collection of data - in this case it's likely just an array but could also be used for many other things.

// App Imports
import CrateType from './types'
import { getAll, getById } from './resolvers'

// Crates All - is a query that returns all crates. It looks like 'resolve' is what is returned after a successful call to this method.
export const crates = {
  type: new GraphQLList(CrateType),
  args: {
    orderBy: { type: GraphQLString }
  },
  resolve: getAll
}

// Crate By ID - Returns a Crate by passing its ID in to the query body.
export const crateById = {
  type: CrateType,
  args: {
    crateId: { type: GraphQLInt }
  },
  resolve: getById
}

// Here is where we'd need to define the query for a crate being able to tell which products it has.
