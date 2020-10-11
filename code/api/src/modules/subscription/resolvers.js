// SEE CRATE FOR MORE GENERAL ANNOTATIONS ANY DIFFERENT LINES ANNOTATED HERE

// App Imports
import models from '../../setup/models'

// Get subscription by ID - get a subscription by the id, and include the user and crate values with it.
export async function get(parentValue, { id }) {
  return await models.Subscription.findOne({
    where: { id },
    include: [
      { model: models.User, as: 'user' },
      { model: models.Crate, as: 'crate' },
    ]
  })
}

// Get subscription by user
export async function getByUser(parentValue, {}, { auth }) {
  if(auth.user && auth.user.id > 0) {
    // have to make sure that the subscription matches the user and that it is greater than 0 to return all subscriptions belonging to user
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

// Get all subscriptions
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
    // have to make sure that user exists and that the user id is valid to make the relationship - add subscription to user. It's creating the relationship
    return await models.Subscription.create({
      crateId,
      userId: auth.user.id
    })
  } else {
    throw new Error('Please login to subscribe to this crate.')
  }
}

// Delete subscription - deletes the relationship
export async function remove(parentValue, { id }, { auth }) {
  if(auth.user && auth.user.id > 0) {
    return await models.Subscription.destroy({where: {id, userId: auth.user.id}})
  } else {
    throw new Error('Access denied.')
  }
}
