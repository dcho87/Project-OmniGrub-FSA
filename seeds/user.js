const {
  models: { User, Favorites },
} = require("../server/db");

async function userSeed() {
  const users = await Promise.all([
    User.create({
      email: "ken@omni.com",
      password: "123",
      firstName: "Kenneth",
      lastName: "Rosas",
      isAdmin: true,
    }),
    User.create({
      email: "sara@omni.com",
      password: "123",
      firstName: "Sara",
      lastName: "Ro",
      isAdmin: true,
    }),
    User.create({
      email: "nick@omni.com",
      password: "123",
      firstName: "Nick",
      lastName: "Baez",
      isAdmin: true,
    }),
    User.create({
      email: "dan@omni.com",
      password: "123",
      firstName: "Daniel",
      lastName: "Cho",
      isAdmin: true,
    }),
    User.create({
      email: "john@test.com",
      password: "123",
      firstName: "John",
      lastName: "Doe",
      isAdmin: false,
    }),
  ]);
  await Promise.all(
    users.map(async (user) => {
      await user.addFavorites(await Favorites.create());
    })
  );
  console.log(`seeded ${users.length} users`);

  return users;
}

module.exports = userSeed;
