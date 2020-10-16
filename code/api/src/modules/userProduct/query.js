// Imports
import { GraphQLInt, GraphQLList } from 'graphql'

// App Imports
import UserProductType from './types'
import { getProductsByUser } from './resolvers'

// Products by user
export const productsByUser = {
  type: new GraphQLList(UserProductType),
  resolve: getProductsByUser
}
