const express = require('express');
const Joi = require('joi');
const {User} = require('../models/user');
const rourter = express.Router();
const bcrypt = require('bcrypt');
const generateAuthToken = require('../utils/genAuthToken');


rourter.post("/", async (req, res) => {
   try {
    const schema = Joi.object({
      email: Joi.string().min(3).max(20).email().required(),
      password: Joi.string().min(3).max(40).required()
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User does not exist..");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Invalid email or password...");

  const token = generateAuthToken(user);
  res.send(token);
   } catch (error) {
    console.log(error)
    res.status(500).send(error);
   }
 
});

module.exports = rourter;