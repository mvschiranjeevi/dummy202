// var createError = require("http-errors");
// var express = require("express");
// var path = require("path");
// var cookieParser = require("cookie-parser");
// var logger = require("morgan");

// var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRoutes = require("./routes/auth");
var freeRoutes = require("./routes/freetrail");
var locationRoutes = require("./routes/location");
var checkinRoutes = require("./routes/checkin");
var classRoutes = require("./routes/class");
var scheduleRoutes = require("./routes/userschedule");
var equipmentRoutes = require("./routes/equipment")
var activityRoutes = require("./routes/activity")

// var app = express();

// // view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
// app.use("/users", usersRouter);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

// app.listen(PORT, () => {
//   logger.info(` Starting on ${ENVIRONMENT} Environment`);
//   logger.info(`${MONGO_URI}`);
//   // Connect to Database
//   connect();
//   // Inject Routes
//   routes(app);
//   logger.info(`API Server up and running on PORT ${PORT}`);
// });

// module.exports = app;

require("dotenv").config();
var express = require("express");
var app = express();
var cors = require("cors");
var connection = require("./database");
// const userRoutes = require("./routes/users");
// const authRoutes = require("./routes/auth");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors({credentials: true, origin: true}));

// routes
app.use("/api/users", usersRouter);
app.use("/api/auth", authRoutes);
app.use("/api/freeTrail", freeRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/checkin", checkinRoutes);
app.use("/api/class", classRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/activity", activityRoutes);


const port = 8080;
app.listen(port, console.log(`Listening on port ${port}...`));

module.exports = app;
