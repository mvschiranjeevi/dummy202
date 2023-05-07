const router = require("express").Router();
const Checkin = require("../models/checkin");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    console.log(req.body["64555b8b8648824c963e1707"]);
    // const { error } = validate(req.body);
    // if (error)
    //   return res.status(400).send({ message: error.details[0].message });

    const checkinDetails = await Checkin.findOne({
      date: req.body.date,
      userId: req.body.userId,
    });

    console.log(req.body.date);

    if (checkinDetails) {
      await new Checkin({
        ...req.body,
        _id: checkinDetails._id,
        userId: req.body.userId,
        checkinTime: req.body.checkinTime,
        checkoutTime: req.body.checkoutTime,
        date: req.body.date,
        locationId: req.body.locationId,
      }).save();
    } else {
      await new Checkin({
        ...req.body,
        userId: req.body.userId,
        checkinTime: req.body.checkinTime,
        checkoutTime: req.body.checkoutTime,
        date: req.body.date,
        locationId: req.body.locationId,
      }).save();
    }

    res.status(201).send({ message: "Checked In/Out Successfully" });
    // if (user)
    //   return res
    //     .status(409)
    //     .send({ message: "User with given email already Exist!" });

    // const salt = await bcrypt.genSalt(Number(process.env.SALT));
    // const hashPassword = await bcrypt.hash(req.body.password, salt);

    // await new User({ ...req.body, password: hashPassword }).save();
    // res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});
router.get("/", async (req, res) => {
  try {
    const date = req.body.date;
    const userId = req.body.userId;
    const info = await Checkin.findOne({ userId: userId, date: date })
      .limit(1)
      .sort({ $natural: -1 });

    console.log(info);
    res.status(201).send({ data: info, message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
