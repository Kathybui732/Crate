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

// Subscriptions by user
export const subscriptionsByUser = {
  type: new GraphQLList(SubscriptionType),
  resolve: getByUser
}

// Subscription By id - This eventually points to the 'get' function in resolvers.js in this directory.
export const subscription = {
  type: SubscriptionType,
  args: {
    id: { type: GraphQLInt }
  },
  resolve: get
}

// We'd need another query here for getting the current delivery date. 
