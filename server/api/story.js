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

router.post('/current', async (req, res, next) => {
  try {
    const newStory = await Story.create()
    res.json(Story)
  } catch (err) {
    next(err)
  }
})

router.get('/current/fragments', async (req, res, next) => {
  try {

    const fragments = await Fragment.findAll({
      where: {complete: false}
    })

    res.json(fragments)

  } catch (err) {
    next(err)
  }
})

//Add vote 
router.put('/current/fragment/:id', async (req, res, next) => {
  
  try {
    const fragment = await Fragment.findById(req.params.id)
    const updatedFragment = await fragment.update({votes: fragment.votes + 1})
    res.json(updatedFragment)
    
  } catch (err) {
    next(err)
  }
})

router.post('/current/fragment/new/:storyId', async (req, res, next) => {

  const words = req.body.words
  
  try {
    const fragment = await Fragment.create({
      words,
      storyId: req.params.storyId
    })

    res.json(fragment)

  } catch (err) {
    next(err)
  }
})


//completing story
router.put('/current/complete', async (req, res, next) => {
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