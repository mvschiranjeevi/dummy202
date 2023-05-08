const router = require("express").Router();
const Class = require("../models/class");

router.get("/", async (req, res) => {
  try {
    // console.log("1---hello");
    const classes = await Class.find();
    // console.log(classes);
    res.status(201).send(classes);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/schedule", async (req, res) => {
  try {
    // console.log("1---hello");
    // console.log(req.query.id);
    const schedule = await Class.find({ _id: req.query.id });
    // console.log(schedule);
    res.status(201).send(schedule);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/className", async (req, res) => {
  try {
    const className = await Class.find({ _id: req.query.id });
    // console.log(schedule);
    res.status(201).send(className);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
