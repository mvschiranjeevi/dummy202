const router = require('express').Router();
const Visitors = require('../models/visitor');

app.post('/visits', async (req, res) => {
    try {
      const { userId, visitDate } = req.body;
      const newVisit = await VisitsModel.create({ userId, visitDate });
      res.status(201).json(newVisit);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error logging gym visit' });
    }
  });
  