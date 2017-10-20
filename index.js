const express = require('express')
      knex = require('knex')(require('./ENV_CONFIG.json')['DB_CONFIG'])
      app = express()
      graphQlApi = require('./graphQlApi/index.js')
      graphqlHTTP = require('express-graphql')
      cors = require('cors')

const corsOptions = {
    origin(origin, callback) {
        callback(null, true);
    },
    credentials: true
};
const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,token');
    next();
}

app.use(cors(corsOptions))

app.use('/api',
  allowCrossDomain,
  graphqlHTTP({
    schema: graphQlApi,
    graphiql: true
  })
)

app.listen(3000, function () {
  console.log({});
  console.log('Example app listening on port 3000!')
})
