const router = require('express').Router();
const Equipment = require('../models/equipment');


router.get('/', async (req, res) => {

  try {
    console.log("Hii")
    const equipments = await Equipment.find();
    console.log(equipments)
    res.send(equipments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// router.get('/equipments', async (req, res) => {

//   try {

//     const id= req.params.equipmentId
//     console.log("Hii")
//     const equipments = await Equipment.findOne({_id:id});
//     console.log(equipments)
//     res.send(equipments);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });



module.exports = router;
