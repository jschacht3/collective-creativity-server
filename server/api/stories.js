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




module.exports = router