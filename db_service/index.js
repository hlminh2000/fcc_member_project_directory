const knex = require('knex')(require('../ENV_CONFIG.json')['DB_CONFIG'])

module.exports = knex
