const router = require('express').Router()
const {Story, Sentence} = require('../db/models')

router.get('/all', async (req, res, next) => {
    try {
      const stories = await Story.findAll()
      res.json(stories)
    } catch (err) {
      next(err)
    }
})

router.get('/active', async (req, res, next) => {
  try {
    const story = await Story.findOne({
      where: {complete: false}
    })
    res.json(story)
  } catch (err) {
    next(err)
  }
})

router.get('/active/sentences', async (req, res, next) => {
  try {
    const sentences = await Sentence.findAll({
      where: {complete: false}
    })
    res.json(sentences)
  } catch (err) {
    next(err)
  }
})




module.exports = router