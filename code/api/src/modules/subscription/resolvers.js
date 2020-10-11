// App Imports
import models from '../../setup/models'

// Get subscription by ID
export async function get(parentValue, { id }) {
  return await models.Subscription.findOne({
    where: { id },
    include: [
      { model: models.User, as: 'user' },
      { model: models.Crate, as: 'crate' },
    ]
  })
}

// Get subscription by user - It looks like 'auth' is passed in when this method is called. I wonder where exactly that is. Maybe somewhere on the front end? It looks like the actual act of authentication is handled here - if the user is not logged in then they can't use this function.
export async function getByUser(parentValue, {}, { auth }) {
  if(auth.user && auth.user.id > 0) {
    return await models.Subscription.findAll({
      where: {
        userId: auth.user.id
      },
      include: [
        {model: models.User, as: 'user'},
        {model: models.Crate, as: 'crate'},
      ]
    })
  } else {
    throw new Error('Please login to view your subscriptions.')
  }
}

// Get all subscriptions - It does not look like any authentication happens in this function.
export async function getAll() {
  return await models.Subscription.findAll({
    include: [
      { model: models.User, as: 'user' },
      { model: models.Crate, as: 'crate' },
    ]
  })
}

// Create subscription
export async function create(parentValue, { crateId }, { auth }) {
  if(auth.user && auth.user.id > 0) {
    return await models.Subscription.create({
      crateId,
      userId: auth.user.id
    })
  } else {
    throw new Error('Please login to subscribe to this crate.')
  }
}

// Delete subscription
export async function remove(parentValue, { id }, { auth }) {
  if(auth.user && auth.user.id > 0) {
    return await models.Subscription.destroy({where: {id, userId: auth.user.id}})
  } else {
    throw new Error('Access denied.')
  }
}

// This file is where we'd need to add functionality for read and update functionality for a subscription delivery date.
