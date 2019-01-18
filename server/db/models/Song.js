const Sequelize = require('sequelize')
const db = require('../db')

const Song = db.define('song', {
    name: {
      type: Sequelize.STRING,
    },
    music: {
      type: Sequelize.ARRAY(Sequelize.STRING)
    }
})
  
  module.exports = Song