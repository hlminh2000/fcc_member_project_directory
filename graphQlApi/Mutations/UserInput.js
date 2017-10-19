const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
} = require('graphql'),
{
  createUserWithEmailAndPassword
} = require('../../firebase_service/firebaseService.js'),
  express = require('express'),
  dbService = require('../../db_service/index.js'),
  UserType = require('../Queries/user.js')

const UserInputType = {
  type: UserType,
  description: 'Adds a new user and returns the user that was added',
  args: {
    username: { type: GraphQLString },
    email:    { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: (root, args) => createUserWithEmailAndPassword(
    args.email,
    args.password
  ).then( user => dbService()
    .insert({
      user_id : user.uid,
      username: args.username,
      email   : args.email,
    })
    .into('users')
    .then(e => dbService()
      .select()
      .from('users')
      .where({
        'user_id': user.uid
      })
    )
  )
}

module.exports = UserInputType
