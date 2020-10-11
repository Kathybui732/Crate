// Imports
import { GraphQLString, GraphQLInt } from 'graphql'
// We are importing these functions from 'graphql' library

// App Imports
import CrateType from './types'
import { create, remove, update } from './resolvers'
// importing the methods from these objects from other files within repo

// Crate create - This mutation allows us to create a crate
export const crateCreate = {
  // export statement is used when creating JavaScript modules to export live bindings to functions, objects, or primitive values from the module so they can be used by other programs with the import statement
  type: CrateType,
  // Type contains description of the data (i.e. properties, operations, etc)
  //   Class is a specific type - it is a template to create instances of objects.
  args: {
    name: {
      name: 'name',
      type: GraphQLString
    },

    description: {
      name: 'description',
      type: GraphQLString
    }
  },
  resolve: create
}

// Crate update - Allows up to update an exisiting crate
// crateUpdate deals with a CrateType that has arguments of id, name and description with specific datatypes that you can use to update their value
export const crateUpdate = {
  type: CrateType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    },

    name: {
      name: 'name',
      type: GraphQLString
    },

    description: {
      name: 'description',
      type: GraphQLString
    }
  },
  resolve: update
}

// Crate remove - To remove a crate you just need the id.
export const crateRemove = {
  type: CrateType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
}
