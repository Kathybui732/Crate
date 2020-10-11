// SEE CRATE FOR MORE GENERAL ANNOTATIONS ANY DIFFERENT LINES ANNOTATED HERE

// Imports
import { GraphQLInt, GraphQLList } from 'graphql'

// App Imports
import SubscriptionType from './types'
import { getAll, getByUser, get } from './resolvers'

// Subscriptions All
export const subscriptions = {
  type: new GraphQLList(SubscriptionType),
  resolve: getAll
}

// Subscriptions by user - like User.subscriptions, gets all subscriptions a specfic user has made
export const subscriptionsByUser = {
  type: new GraphQLList(SubscriptionType),
  resolve: getByUser
}

// Subscription By id
export const subscription = {
  type: SubscriptionType,
  args: {
    id: { type: GraphQLInt }
  },
  resolve: get
}
