// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'

// Crate type
const CrateType = new GraphQLObjectType({
  name: 'crate',
  description: 'Crate Type',

  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

export default CrateType

// This defines what a crate object is, as a CrateType. We may need to make a ProductType so acrate can know about its products.