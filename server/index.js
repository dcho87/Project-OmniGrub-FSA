const { db } = require("./db");
const PORT = process.env.PORT || 4000;
const app = require("./app");
const seed = require("../seeds");
require("dotenv").config();

const init = async () => {
  try {
    if ((process.env.SEED = "true")) {
      await seed();
    } else {
      await db.sync();
    }
    app.listen(PORT, () =>
      console.log(`ALL SERVERS REPORTING FOR DUTY ON ${PORT}`)
    );
  } catch (ex) {
    console.log(ex);
  }
};

init();
