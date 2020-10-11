// Imports
import { GraphQLSchema } from 'graphql'

// App Imports
import query from './queries'
import mutation from './mutations'

// Schema
const schema = new GraphQLSchema({
  query,
  mutation
})

export default schema

// Maybe this file is the most "top level" file in this schema directory, and is called upon by other parts of the app?
