const express = require('express')
      knex = require('knex')(require('./ENV_CONFIG.json')['DB_CONFIG'])
      app = express()

app.get('/users', function (req, res) {
  knex
    .select()
    .from('users')
    .then(result => {
      console.log(result);
      res.send(result)
    })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
