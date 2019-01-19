const Sequelize = require('sequelize')
const db = require('../db')

const Sentence = db.define('sentence', {
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
  
  module.exports = Sentence