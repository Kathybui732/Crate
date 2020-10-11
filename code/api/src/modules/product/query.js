// SEE CRATE FOR MORE GENERAL ANNOTATIONS ANY DIFFERENT LINES ANNOTATED HERE

// Imports
import { GraphQLString, GraphQLInt, GraphQLList } from 'graphql'

// App Imports
import { ProductType, ProductTypesType } from './types'
import { getAll, getBySlug, getById, getRelated, getTypes } from './resolvers'

// Products All
export const products = {
  type: new GraphQLList(ProductType),
  resolve: getAll
}

// Product By slug
// A slug is a unique string (typically a normalized version of title or other representative string), often used as part of a URL.
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

// Products Related - like in the related section where you can get items that are related
export const productsRelated = {
  type: new GraphQLList(ProductType),
  args: {
    productId: { type: GraphQLInt }
  },
  resolve: getRelated
}

// Product Types - gets all product types
export const productTypes = {
  type: new GraphQLList(ProductTypesType),
  resolve: getTypes
}
