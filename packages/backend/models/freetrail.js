const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const freeTrailSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  location: { type: mongoose.Schema.Types.ObjectId, required: true },
});

const FreeTrail = mongoose.model("freeTrail", freeTrailSchema);

const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    phoneNumber: Joi.number().required().label("Phone Number"),
    location: Joi.string().label("Location"),
    // membershipId: Joi.number().required().label("Membership Id"),
  });
  return schema.validate(data);
};

module.exports = { FreeTrail, validate };
