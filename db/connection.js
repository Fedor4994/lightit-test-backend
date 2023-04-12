const mongoose = require("mongoose");

const uriDb = process.env.MONGO_URL;
mongoose.set("strictQuery", false);
const connection = mongoose.connect(uriDb);

module.exports = {
  connection,
};
