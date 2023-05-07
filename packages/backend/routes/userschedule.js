const router = require("express").Router();
const Userschedule = require("../models/userschedule");

router.get("/", async (req, res) => {
  try {
    const classId = req.query.classId;
    const userId = req.query.userId;
    console.log(userId);
    console.log(classId);

    const schedule = await Userschedule.find({
      userId: userId,
      classId: classId,
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
    console.log("1", req.body);

    let request = req.body.schedule;

    console.log(request.filter);
    var filtered = request.filter(function (el) {
      return el != null;
    });

    req.body.schedule = filtered;

    console.log(req.body);

    await new Userschedule({ ...req.body }).save();

    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
