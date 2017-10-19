const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
} = require('graphql')
express = require('express')
dbService = require('../../db_service/index.js')
UserType = require('../Queries/user.js')

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

module.exports = UserInputType
