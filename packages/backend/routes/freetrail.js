const router = require("express").Router();
const { User } = require("../models/user");
const { FreeTrail, validate } = require("../models/freetrail");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    // console.log(req.body);
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });
    const user = await User.findOne({ email: req.body.email });

    if (user)
      return res.status(409).send({ message: "User is already a member" });

    const freeTrail = await FreeTrail.findOne({ email: req.body.email });
    if (freeTrail)
      return res
        .status(409)
        .send({ message: "User already resgistered for free trail" });

    // const salt = await bcrypt.genSalt(Number(process.env.SALT));
    // const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new FreeTrail({ ...req.body }).save();
    res
      .status(201)
      .send({ message: "User registered to free trail successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
