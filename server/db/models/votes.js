const Sequelize = require('sequelize')
const db = require('../db')

const Vote = db.define('vote', {
    note: {
      type: Sequelize.STRING,
    }
  })
  
  module.exports = Vote