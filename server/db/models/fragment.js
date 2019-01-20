const Sequelize = require('sequelize')
const db = require('../db')

const Fragment = db.define('fragment', {
    words: {
      type: Sequelize.STRING,
    },
    votes: {
      type: Sequelize.INTEGER
    },
    complete: {
      type: Sequelize.BOOLEAN
    }
})
  
  module.exports = Fragment