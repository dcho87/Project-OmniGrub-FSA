const { db } = require("../server/db");

const userSeed = require("./user");

async function seed() {
  await db.sync({ force: true }); //clear db and match models
  console.log("DB Has been Synced!");

  const [users] = await Promise.all([userSeed()]);
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