const router = require('express').Router();
const Gymhours = require('../models/gymhours');


app.post('/log-visit', async (req, res) => {
    const { userId, date, durationMinutes } = req.body;
  
    
    const newVisit = new GymVisit({
      userId,
      date,
      durationMinutes
    });
  
    try {
      
      await newVisit.save();
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });
  