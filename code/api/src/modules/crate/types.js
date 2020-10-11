// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'

// Crate type - this is defining what a Crate object is, as a "Crate Type". I think this is analogous to if in Ruby you have a crate object and call object.class in the command line - it will return that it is a Crate.
// It looks like this file, as well as the model file, are the only ones in this directoy that do not import functionality from other parts of the app. They only import from Graphql. This leads me to believe that the model and type files are the "lowest level/closest to the metal" when describing/defining an object. They are the most basic parts.
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

// We may need to make a Product Type so a crate can query about its products? If we did, that functionality would be here.
