const router = require("express").Router();
const { Location } = require("../models/location");

router.get("/", async (req, res) => {
  try {
    const location = await Location.find();
    // console.log(location);
    res.status(201).send(location);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/getName", async (req, res) => {
  try {
    const classId = req.query.classId;
    // console.log("1---", classId);
    const location = await Location.find({ _id: classId });
    // console.log(location);
    res.status(201).send(location);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
