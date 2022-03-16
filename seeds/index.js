const { db, models: { Test } } = require("../server/db");
const userSeed = require("./user");
const { dataRYelp } = require("../server/db/yelpTest/business");

async function seed() {
  await db.sync({ force: true }); //clear db and match models
  console.log("DB Has been Synced!");

  const [users] = await Promise.all([userSeed()]);
  // CREATING TEST DATA FOR RESTAURANTS IN CA
  const testData = await Promise.all(
    dataRYelp.map((restaurant, idx)=>{
      Test.create({
        businessId: restaurant["business_id"],
        name: restaurant["name"],
        address: restaurant["address"],
        city: restaurant["city"],
        state: 'CA',
        postalCode: restaurant["postal_code"],
        latitude: restaurant["latitude"],
        longitude: restaurant["longitude"],
        stars: restaurant["stars"],
        // attributes: restaurant["attributes"],
        reviewCounts: restaurant["review_count"],
        categories: restaurant["categories"],
      })
    })
  )
  console.log(`seeded ${testData.length} restaurants from Yelp Test Dataset`);

  console.log(`

    seeded successfully!!
    
`);
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.log(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
    runSeed();
  }

  module.exports = seed;