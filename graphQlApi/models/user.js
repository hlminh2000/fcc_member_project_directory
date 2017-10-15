const dbService = require('../../db_service/index.js')
const {
  graphql,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql')

const UserType = () => ({
  type: new GraphQLObjectType({
    name: 'user',
    description: 'user informations',

    fields: () => ({
      username: {
        type : GraphQLString,
        args : {},
        resolve : (root, args) => root[0].username
      },
      email: {
        type : GraphQLString,
        args : {},
        resolve : (root, args) => root[0].email
      },
      created_time: {
        type : GraphQLString,
        args : {},
        resolve : (root, args) => root[0].created_time
      },
    }),
  }),

  args: {
    id: { type: GraphQLString }
  },

  resolve: (root, args) => dbService
    .select()
    .from('users')
    .where({
      'user_id': args.id
    })
})


// module.export = UserType
