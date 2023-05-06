const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const checkinSchmena = new mongoose.Schema({
  userId: { type: String, required: true },
  checkinTime: { type: String, required: true },
  checkoutTime: { type: String, required: true },
  date: { type: String, required: true },
});

const User = mongoose.model("user", checkinSchmena);

module.exports = User;
