const router = require('express').Router();
const Activity = require('../models/activity');


router.post("/", async (req, res) => {
    try {
console.log("jiiiiiiiiii")
      console.log("---",req.body)

        await new Activity({ ...req.body }).save();
        

      // const checkinDetails = await Checkin.findOne({
      //   date: req.body.date,
      //   userId: req.body.userId,
      // });
  
      // // console.log(req.body.date);
  
      // if (checkinDetails) {
      //   await new Checkin({
      //     ...req.body,
      //     _id: checkinDetails._id,
      //     userId: req.body.userId,
      //     checkinTime: req.body.checkinTime,
      //     checkoutTime: req.body.checkoutTime,
      //     date: req.body.date,
      //     locationId: req.body.locationId,
      //   }).save();
      // } else {
      //   await new Checkin({
      //     ...req.body,
      //     userId: req.body.userId,
      //     checkinTime: req.body.checkinTime,
      //     checkoutTime: req.body.checkoutTime,
      //     date: req.body.date,
      //     locationId: req.body.locationId,
      //   }).save();
      // }
  
      res.status(201).send({ message: "Checked In/Out Successfully" });

    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  });

  router.get('/', async (req, res) => {

    try {
      console.log("Hii++__)KNJHVIUH")
      const activity = await Activity.find();
      console.log(activity)
      res.send(activity);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


module.exports = router;
