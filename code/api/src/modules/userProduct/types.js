// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'

// App Imports
import { UserType } from '../user/types'
import { ProductType } from '../product/types'

// UserProduct type
const UserProductType = new GraphQLObjectType({
  name: 'userProduct',
  description: 'UserProduct Type',

  fields: () => ({
    id: { type: GraphQLInt },
    user: { type: UserType },
    product: { type: ProductType },
    status: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

export default UserProductType
