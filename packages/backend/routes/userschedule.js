const router = require("express").Router();
const Userschedule = require("../models/userschedule");

router.get("/", async (req, res) => {
  try {
    const classId = req.query.classId;
    const userId = req.query.userId;
    // console.log(userId);
    // console.log(classId);

    const schedule = await Userschedule.find({
      userId: userId,
      classId: classId,
      isDeleted: false,
    });
    // console.log(schedule);
    res.status(201).send(schedule);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/prev", async (req, res) => {
  try {
    // console.log(userId);
    // console.log(classId);

    const schedule = await Userschedule.find({});
    res.status(201).send(schedule);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/all", async (req,res) => {
  try {
    const userId = req.query.userId;
    console.log(userId)
    const schedule = await Userschedule.find({
      userId: userId,
    });
    console.log(schedule);
    res.status(201).send(schedule);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    let request = req.body.schedule;

    var filtered = request.filter(function (el) {
      return el != null;
    });

    req.body.schedule = filtered;

    await new Userschedule({ ...req.body }).save();

    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/delete", async (req, res) => {
  try {
    req.body[0].isDeleted = true;
    await Userschedule.updateOne({ _id: req.body[0]._id }, req.body[0]);
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
