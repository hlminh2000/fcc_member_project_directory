const express = require('express')
      knex = require('knex')(require('./ENV_CONFIG.json')['DB_CONFIG'])
      app = express()
      graphQlApi = require('./graphQlApi/index.js')
      graphqlHTTP = require('express-graphql');

// app.get('/users', function (req, res) {
//   knex
//     .select()
//     .from('users')
//     .then(result => {
//       console.log(result);
//       res.send(result)
//     })
// })

app.use('/api', graphqlHTTP({
  schema: graphQlApi,
  graphiql: true
}))

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
