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

router.get('/content', async (req, res, next) => {
  try {

    const fragments = await Fragment.findAll({
      where: {complete: true, winner: true}
    })

    res.json(fragments)
  } catch (err) {
    next(err)
  }
})

router.get('/current', async (req, res, next) => {
  try {
    const story = await Story.findOrCreate({
      where: {complete: false}
    })

    res.json(story[0])
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

router.post('/current/fragment/new', async (req, res, next) => {
 
  try {
    const words = req.body.submission

    const currentStory = await Story.findOrCreate({
      where: {complete: false}
    })

    const fragment = await Fragment.create({
      words,
      storyId: currentStory.id,
      votes: 1, 
      complete: false
    })

    res.json(fragment)

  } catch (err) {
    next(err)
  }
})


//completing vote
router.put('/current/vote/complete/:id', async (req, res, next) => {

    try {
      
    const story = await Story.findOne({
      where: {complete: false}
    })

    const winningFragment = await Fragment.findById(req.params.id)  
   
    if (story.title === null) {
      await story.update({
        title: winningFragment.words
      })
    }

    const fragments = await Fragment.update({complete: true}, 
      {
        where: {complete: false}
      }
    )

    await winningFragment.update({
      winner: true
    })

    res.json(winningFragment)

  } catch (err) {
    next(err)
  }
})

module.exports = router