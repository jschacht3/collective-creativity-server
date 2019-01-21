const router = require('express').Router()
const {Story, Fragment} = require('../db/models')

router.get('/all', async (req, res, next) => {
    try {
      const stories = await Story.findAll()
      res.json(stories)
    } catch (err) {
      next(err)
    }
})

router.get('/current', async (req, res, next) => {
  try {
    const story = await Story.findOne({
      where: {complete: false}
    })
    res.json(story)
  } catch (err) {
    next(err)
  }
})

router.get('/active/fragments', async (req, res, next) => {
  try {

    const fragments = await Fragment.findAll({
      where: {complete: false}
    })

    res.json(fragments)

  } catch (err) {
    next(err)
  }
})

router.put('/active/fragment/:id', async (req, res, next) => {
  
  try {
    const story = await Story.findOne({
      where: {complete: false}
    })

    res.json(story)
  } catch (err) {
    next(err)
  }
  
})


//completing story
router.put('/active/complete', async (req, res, next) => {
  try {

    const story = await Story.findOne({
      where: {complete: false}
    })

    if (story) {
      const completeStory = await story.update({
        complete: true
      })
    }
    
    const fragments = await Fragment.findAll({
      where: {complete: false}
    })

    if (fragments){
      for (let i = 0; i < fragments.length; i++) {
        await fragments[i].update({
          complete: true
        })
      }
    }

    res.json("Story Complete")

  } catch (err) {
    next(err)
  }
})




module.exports = router