const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  buildSchema
} = require('graphql')
express = require('express')
dbService = require('../db_service/index.js')
UserType = require('./models/user.js')

console.log(UserType);

const UserInputType = {
  type: UserType,
  description: 'Adds a new user and returns the user that was added',
  args: {
    id:       { type: GraphQLString },
    username: { type: GraphQLString },
    email:    { type: GraphQLString },
  },
  resolve: (root, args) => dbService()
    .insert({
      user_id : args.id,
      username: args.username,
      email   : args.email,
    })
    .into('users')
    .then(e => dbService()
      .select()
      .from('users')
      .where({
        'user_id': args.id
      })
    )
}

const ApiRoot = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'ApiRoot',
    description: 'The root graphql query',
    fields: () => ({
      user: {
        type: UserType,
        args: {
          id: { type: GraphQLString }
        },
        resolve: (root, args) => dbService
          .select()
          .from('users')
          .where({
            'user_id': args.id
          })
      }
    })
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutations',
    description: 'Mutations to the root level',
    fields: () => ({
      newUser: UserInputType
    })
  })
})

module.exports = ApiRoot
