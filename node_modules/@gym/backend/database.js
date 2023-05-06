const mongoose = require("mongoose");
let database;

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(process.env.MONGO_URI, connectionParams);
    console.log("hi");
    console.log("Connected to DB Successfully");
  } catch (error) {
    console.log(error);
    console.log("Couldn't connect to DB");
  }
};
