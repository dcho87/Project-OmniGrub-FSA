const { db } = require("./db");
const PORT = process.env.PORT || 4000;
const app = require("./app");

const init = async () => {
  try {
    await db.sync()
    app.listen(PORT, () => console.log(`ALL SERVERS REPORTING FOR DUTY ON ${PORT}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();