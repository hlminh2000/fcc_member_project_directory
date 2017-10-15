const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')
express = require('express')
dbService = require('../db_service/index.js')
// UserType = require('./models/user.js')


const UserType = {
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
      }
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
}

const newUserType = {
  type: GraphQLString,
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
      .then(result => {
        return new Promise(function(resolve, reject) {
          resolve(JSON.stringify(result[0]))
        })
      })
    )
}

const ApiRoot = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'ApiRoot',
    description: 'The root graphql query',
    fields: () => ({
      user: UserType
    })
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutation',
    description: 'Mutations to the root level',
    fields: () => ({
      newUser: newUserType
    })
  })
})

module.exports = ApiRoot
