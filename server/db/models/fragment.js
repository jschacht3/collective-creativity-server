const Sequelize = require('sequelize')
const db = require('../db')

const Fragment = db.define('fragment', {
    words: {
      type: Sequelize.STRING,
    },
    votes: {
      type: Sequelize.INTEGER,
      default: 1
    },
    complete: {
      type: Sequelize.BOOLEAN,
      default: false
    },
    winner: {
      type: Sequelize.BOOLEAN,
      default: false
    }
})
  
  module.exports = Fragment