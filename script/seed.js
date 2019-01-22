'use strict'

const db = require('../server/db')
const {User, Story, Fragment} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const testContent1 = ["This is test story 1.", "It will include the first story fragments that have been voted upon by users"]
  const testContent2 = ["This is test story 2.", "It will include the second story fragments that have been voted upon by users"]
  

  // const stories = await Promise.all([
  //   Story.create({title: 'Test Story 1', content: testContent1, complete: true}),
  //   Story.create({title: 'Test Story 2', content: testContent2, complete: false})
  // ])

  // const testWords1 = "This is test story 1."
  // const testWords2 = "It will include the first story fragments that have been voted upon by users"
  // const testWords3 = "This is test story 2."
  // const testWords4 = "It will include the second story fragments that have been voted upon by users"
  // const testWords5 = "This is test story 3."
  // const testWords6 = "It will include the third story fragments that have been voted upon by users"
  // const testWords7 = "This was outvoted"
  // const testWords8 = "This is currently losing"
  

  // const fragments = await Promise.all([
  //   Fragment.create({words: testWords1, votes: 15, complete: true, storyId: 1}),
  //   Fragment.create({words: testWords7 + ' 1', votes: 10, complete: true, storyId: 1}),
  //   Fragment.create({words: testWords7 + ' 2', votes: 12, complete: true, storyId: 1}),
  //   Fragment.create({words: testWords7 + ' 3', votes: 14, complete: true, storyId: 1}),

  //   Fragment.create({words: testWords2, votes: 14, complete: true, storyId: 1}),
  //   Fragment.create({words: testWords7 + ' 4', votes: 8, complete: true, storyId: 1}),
  //   Fragment.create({words: testWords7 + ' 5', votes: 7, complete: true, storyId: 1}),
  //   Fragment.create({words: testWords7 + ' 6', votes: 6, complete: true, storyId: 1}),

  //   Fragment.create({words: testWords5, votes: 12, complete: true, storyId: 2}),
  //   Fragment.create({words: testWords7 + ' 7', votes: 8, complete: true, storyId: 2}),
  //   Fragment.create({words: testWords7 + ' 8', votes: 7, complete: true, storyId: 2}),
  //   Fragment.create({words: testWords7 + ' 9', votes: 6, complete: true, storyId: 2}),

  //   Fragment.create({words: testWords6, votes: 11, complete: true, storyId: 2}),
  //   Fragment.create({words: testWords7 + ' 10', votes: 8, complete: true, storyId: 2}),
  //   Fragment.create({words: testWords7 + ' 11', votes: 7, complete: true, storyId: 2}),
  //   Fragment.create({words: testWords7 + ' 12', votes: 6, complete: true, storyId: 2}),

  //   Fragment.create({words: 'The current vote leader.', votes: 8, complete: false, storyId: 2}),
  //   Fragment.create({words: testWords8 + ' 13', votes: 5, complete: false, storyId: 2}),
  //   Fragment.create({words: testWords8 + ' 14', votes: 7, complete: false, storyId: 2}),
  //   Fragment.create({words: testWords8 + ' 15', votes: 6, complete: false, storyId: 2})

  // ])

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed