// Imports
import { GraphQLInt } from 'graphql'

// App Imports
import SubscriptionType from './types'
import { create, remove } from './resolvers'

// Subscription create - Looking just at the code from below, it looks like a Subscription can be created with only a crate ID, even though Subscription is a joins table between crate and user.
export const subscriptionCreate = {
  type: SubscriptionType,
  args: {
    crateId: {
      name: 'crateId',
      type: GraphQLInt
    }
  },
  resolve: create
}

// Subscription remove
export const subscriptionRemove = {
  type: SubscriptionType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
}

// After the above, since we are needing a way to have a user be able to change their delivery date, we would add a mutation here to do something like subscriptionUpdateDeliveryDate.
