// Imports
import { GraphQLInt, GraphQLList } from 'graphql'

// App Imports
import UserProductType from './types'
import { getProductsByUser, getProductsKeptByUser } from './resolvers'

// Products by user
export const productsByUser = {
  type: new GraphQLList(UserProductType),
  resolve: getProductsByUser
}

// Products kept by user
export const productsKeptByUser = {
  type: new GraphQLList(UserProductType),
  resolve: getProductsKeptByUser
}
