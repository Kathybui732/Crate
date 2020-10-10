// A resolver is a function that's responsible for populating hte data for a single field in the schema.
// Whenever a query occurs for a particular field, the resolver for that field fetches the requested data from the appropriate data source.
// A resolver function returns either data of the type required by the resolver's corresponding schema field (string, integer, etc), or a promise that fulfills with data of the required type.
// App Imports
import models from '../../setup/models'
import params from '../../config/params'

// Get crate by ID
export async function getById(parentValue, { crateId }) {
  const crate = await models.Crate.findOne({ where: { id: crateId } })

  if (!crate) {
    // Crate does not exists - I like that there is a "throw" protected word here.
    throw new Error('The crate you are looking for does not exists or has been discontinued.')
  } else {
    return crate
  }
}

// Get all crates - As of this writing, I've tried to make this query to work and have Googled all the errors I've received with no luck. I think the problems stem from how to use orderBy.
export async function getAll(parentValue, { orderBy }) {
  return await models.Crate.findAll({ order: [['id', orderBy]] })
}

// Create crate - The syntax of this function looks familiar. If a user attempts to create a crate without being an admin, they are not allowed to do so.
export async function create(parentValue, { name, description }, { auth }) {
  if(auth.user && auth.user.role === params.user.roles.admin) {
    return await models.Crate.create({
      name,
      description
    })
  } else {
    throw new Error('Operation denied.')
  }
}

// Update crate - Again, it looks like only admins can modify a crate.
export async function update(parentValue, { id, name, description }, { auth }) {
  if(auth.user && auth.user.role === params.user.roles.admin) {
    return await models.Crate.update(
      {
        name,
        description
      },
      {where: {id}}
    )
  } else {
    throw new Error('Operation denied.')
  }
}

// Delete crate - Only an admin can delete a crate.
export async function remove(parentValue, { id }, { auth }) {
  if(auth.user && auth.user.role === params.user.roles.admin) {
    return await models.Crate.destroy({where: {id}})
  } else {
    throw new Error('Operation denied.')
  }
}
