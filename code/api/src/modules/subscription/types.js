// defines sub type. would imagine there would multiple types in real app

// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'

// App Imports
import { UserType } from '../user/types'
import CrateType from '../crate/types'

// Subscription type
const SubscriptionType = new GraphQLObjectType({
  name: 'subscription',
  description: 'Subscription Type',

  fields: () => ({
    id: { type: GraphQLInt },
    user: { type: UserType },
    crate: { type: CrateType },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

export default SubscriptionType