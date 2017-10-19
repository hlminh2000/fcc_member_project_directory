const dbService = require('../../db_service/index.js')
const {
  graphql,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql')

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Information about a user',
  fields: () => ({
    id: {
      type : GraphQLString,
      args : {},
      resolve : (user, args) => user[0].id
    },
    username: {
      type : GraphQLString,
      args : {},
      resolve : (user, args) => user[0].username
    },
    email: {
      type : GraphQLString,
      args : {},
      resolve : (user, args) => user[0].email
    },
    created_time: {
      type : GraphQLString,
      args : {},
      resolve : (user, args) => user[0].create_time
    }
  }),
})

module.exports = UserType
