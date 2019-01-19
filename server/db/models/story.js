const Sequelize = require('sequelize')
const db = require('../db')

const Story = db.define('story', {
    title: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.ARRAY(Sequelize.TEXT)
    }
})
  
  module.exports = Story