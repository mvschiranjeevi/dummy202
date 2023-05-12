const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  location: { type: mongoose.Schema.Types.ObjectId, required: true },
  isEmployee: { type: Boolean, required: true },
  membershipId: { type: Number, required: true },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    phoneNumber: Joi.number().required().label("Phone Number"),
    location: Joi.string().required().label("Location"),
    isEmployee: Joi.boolean().required().label("Is Employee"),
    membershipId: Joi.number().required().label("Membership Id"),
  });
  return schema.validate(data);
};

module.exports = { User, validate };
