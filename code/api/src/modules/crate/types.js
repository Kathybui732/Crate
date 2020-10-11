// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'
// We are importing these functions from 'graphql' library

// Crate type - this is like the validations part in a rails app where we design the object type with it's attributes (fields)
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
