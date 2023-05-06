// const Mongoose = require("mongoose");
// let database;

// const connect = async () => {
//   const databaseConnectionString = process.env.MONGO_URI;

//   if (database) {
//     return;
//   }

//   Mongoose.connect(databaseConnectionString)
//     .then((connection) => {
//       database = connection.connection;
//       console.info("Database Connected");
//     })
//     .catch((error) => {
//       console.error("Error connecting to database: ", error.message);
//     });
// };
// /
// module.exports = connect;
