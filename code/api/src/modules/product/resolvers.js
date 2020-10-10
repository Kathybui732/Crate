// App Imports - Looking more at resolver files, they seem to be like a facade or controller - they don't actually do the "grunt work" of CRUDing a product, but check for whether a request coming in is valid and can be passed off to the function that is able to do that. It looks like the heavy lifting is actually done by the Mutation file.
import params from '../../config/params'
import models from '../../setup/models'

// Get all products
export async function getAll() {
  return await models.Product.findAll({ order: [['id', 'DESC']] })
}

// Get product by slug
export async function getBySlug(parentValue, { slug }) {
  const product = await models.Product.findOne({ where: { slug } })

  if (!product) {
    // Product does not exists
    throw new Error('The product you are looking for does not exists or has been discontinued.')
  } else {
    return product
  }
}

// Get product by ID
export async function getById(parentValue, { productId }) {
  const product = await models.Product.findOne({ where: { id: productId } })

  if (!product) {
    // Product does not exists - I wonder if there is a way to DRY up these error messages, maybe by having a file that just houses all the various error messages and simply calling a method from there. Or, if there is error handling like there is in Rails where you can write something like "error.full_messages.to_sentence"
    throw new Error('The product you are looking for does not exists or has been discontinued.')
  } else {
    return product
  }
}

// Get related products
export async function getRelated(parentValue, { productId }) {
  return await models.Product.findAll({
    where: {
      id: { [models.Sequelize.Op.not]: productId }
    },
    limit: 3,
    order: [[models.Sequelize.fn('RAND')]] // mock related products by showing random products
  })
}

// Create product - Following up on my annotation in Mutations, it does not look like the below has sad path functionality if a Product is attempted to be created without the presence of one or many fields. It only seems to check if the user who is trying to create the product is an admin.
export async function create(parentValue, { name, slug, description, type, gender, image }, { auth }) {
  if(auth.user && auth.user.role === params.user.roles.admin) {
    return await models.Product.create({
      name,
      slug,
      description,
      type,
      gender,
      image
    })
  } else {
    throw new Error('Operation denied.')
  }
}

// Update product
export async function update(parentValue, { id, name, slug, description, type, gender, image }, { auth }) {
  if(auth.user && auth.user.role === params.user.roles.admin) {
    return await models.Product.update(
      {
        name,
        slug,
        description,
        type,
        gender,
        image
      },
      { where: { id } }
    )
  } else {
    throw new Error('Operation denied.')
  }
}

// Delete product
export async function remove(parentValue, { id }, { auth }) {
  if(auth.user && auth.user.role === params.user.roles.admin) {
    const product = await models.Product.findOne({where: {id}})

    if (!product) {
      // Product does not exists
      throw new Error('The product does not exists.')
    } else {
      return await models.Product.destroy({where: {id}})
    }
  } else {
    throw new Error('Operation denied.')
  }
}

// Product types
export async function getTypes() {
  return Object.values(params.product.types)
}
