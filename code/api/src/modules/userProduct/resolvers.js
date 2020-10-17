// App Imports
import models from '../../setup/models'

// Get Products by user
export async function getProductsByUser(parentValue, {}, { auth }) {
  if(auth.user && auth.user.id > 0) {
    return await models.UserProduct.findAll({
      where: {
        userId: auth.user.id
      },
      include: [
        {model: models.User, as: 'user'},
        {model: models.Product, as: 'product'},
      ]
    })
  } else {
    throw new Error('Please login to view your products.')
  }
}

// Get Products kept by user
export async function getProductsKeptByUser(parentValue, {}, { auth }) {
  if(auth.user && auth.user.id > 0) {
    return await models.UserProduct.findAll({
      where: {
        userId: auth.user.id,
        status: 'KEPT'
      },
      include: [
        {model: models.User, as: 'user'},
        {model: models.Product, as: 'product'},
      ]
    })
  } else {
    throw new Error('Please login to view your products.')
  }
}
