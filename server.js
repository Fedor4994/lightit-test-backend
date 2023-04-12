const app = require("./app");
require("dotenv").config();
const { connection } = require("./db/connection");

const PORT = process.env.PORT || 8080;

connection
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
