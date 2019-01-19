const User = require('./user')
const Sentence = require ('./sentence')
const Story = require('./story')

Sentence.belongsTo(Story)
Story.hasMany(Sentence)

module.exports = {
  User, Sentence, Story
}
