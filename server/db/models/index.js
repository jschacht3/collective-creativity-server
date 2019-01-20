const User = require('./user')
const Fragment = require ('./fragment')
const Story = require('./story')

Fragment.belongsTo(Story)
Story.hasMany(Fragment)

module.exports = {
  User, Fragment, Story
}
