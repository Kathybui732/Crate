// Imports
import { GraphQLString, GraphQLInt, GraphQLList } from 'graphql'

// App Imports - Looking at more of these files, importing types allows the const's below to be able to use "type: ...", and importing resolvers allows them to be able to use "resolve: ...". This layout of modules having a model, mutation, query, resolver and type file seems to adhere to SRP, but I wonder if some of the functionality can be combined? Or should be combined?
import { ProductType, ProductTypesType } from './types'
import { getAll, getBySlug, getById, getRelated, getTypes } from './resolvers'

// Products All
export const products = {
  type: new GraphQLList(ProductType),
  resolve: getAll
}

// Product By slug
export const product = {
  type: ProductType,
  args: {
    slug: { type: GraphQLString }
  },
  resolve: getBySlug
}

// Product By ID
export const productById = {
  type: ProductType,
  args: {
    productId: { type: GraphQLInt }
  },
  resolve: getById
}

// Products Related - so products are assigned a type as an int value, and then a query can look for all products of that same type using that int value. I don't believe this functionality is mentioned anywhere in the documentation though.
export const productsRelated = {
  type: new GraphQLList(ProductType),
  args: {
    productId: { type: GraphQLInt }
  },
  resolve: getRelated
}

// Product Types - this allows a user to get all the types of products there are.
export const productTypes = {
  type: new GraphQLList(ProductTypesType),
  resolve: getTypes
}
