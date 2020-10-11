// App Imports
import models from '../../setup/models'
import params from '../../config/params'

//  Async functions are instances of the AsyncFunction constructor, and the await keyword is permitted within them. The async and await keywords enable asynchronous, promise-based behavior to be written in a cleaner style, avoiding the need to explicitly configure promise chains.
// A Promise which will be resolved with the value returned by the async function, or rejected with an exception thrown from, or uncaught within, the async function.
// Async functions can contain zero or more await expressions. Await expressions suspend progress through an async function, yielding control and subsequently resuming progress only when an awaited promise-based asynchronous operation is either fulfilled or rejected. The resolved value of the promise is treated as the return value of the await expression.

// Resolver is a collection of functions that generate response for a GraphQL query. In simple terms, a resolver acts as a GraphQL query handler. Every resolver function in a GraphQL schema accepts four positional arguments as given below −
//
// fieldName:(root, args, context, info) => { result }

// Get crate by ID
export async function getById(parentValue, { crateId }) {
  const crate = await models.Crate.findOne({ where: { id: crateId } })

  if (!crate) {
    // Crate does not exists
    throw new Error('The crate you are looking for does not exists or has been discontinued.')
  } else {
    return crate
  }
}

// Get all crates
export async function getAll(parentValue, { orderBy }) {
  // create method is an asynchronous function
  // The first argument passed to the resolver (parentValue) is simply what the "parent" of the field resolved to -- it will not contain any information about the request itself or how the value was resolved.
  return await models.Crate.findAll({ order: [['id', orderBy]] })
}

// Create crate
export async function create(parentValue, { name, description }, { auth }) {
  // create method is an asynchronous function
  // it needs to take in arguments like:
  // name: {
  //  name: 'name',
  //  type: GraphQLString
  // }
  if(auth.user && auth.user.role === params.user.roles.admin) {
    // probably authorizing that the request is being made by a user/the user matches and the user role is admin, then we can create an object
    return await models.Crate.create({
      name,
      description
    })
    // this is the returned if user is authorized and a Crate instance is created
  } else {
    throw new Error('Operation denied.')
  }
  // if the user is not authorized, return this error
}

// Update crate
export async function update(parentValue, { id, name, description }, { auth }) {
  // asynchronous function update that takes in arguments like:
  // name: {
    //  name: 'name',
    //  type: GraphQLString
  // }
  // user has to also be authorized
  if(auth.user && auth.user.role === params.user.roles.admin) {
    // probably authorizing that the request is being made by a user/the user matches and the user role is admin, then we can create an object
    return await models.Crate.update(
      {
        name,
        description
      },
      {where: {id}}
      // this specifies which exact Crate we will be updating
    )
  } else {
    throw new Error('Operation denied.')
    // else return this error if authorization is not okay'd
  }
}

// Delete crate - delete a crate with the id specified if authorization is made, else throw error
export async function remove(parentValue, { id }, { auth }) {
  if(auth.user && auth.user.role === params.user.roles.admin) {
    return await models.Crate.destroy({where: {id}})
  } else {
    throw new Error('Operation denied.')
  }
}
