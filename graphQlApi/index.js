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
  UserType = require('./Queries/user.js')
  UserInputType = require('./Mutations/UserInput.js')

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
    description: 'Root Level Mutations',
    fields: () => ({
      newUser: UserInputType
    })
  })
})

module.exports = ApiRoot
