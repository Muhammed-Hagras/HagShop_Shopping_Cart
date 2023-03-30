const express = require('express');
const Joi = require('joi');
const {User} = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const generateAuthToken = require('../utils/genAuthToken');

router.post("/", async (req, res) => {
    try {
        const schema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().min(3).max(20).email().required(),
            password: Joi.string().min(3).max(40).required()
        });

        const { error} = schema.validate(req.body);

    
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
    
        let existedUser = await User.findOne({ email: req.body.email });
    
        if (existedUser) {
            return res.status(400).json({ error: "User already exists" });
        }
    
        
    
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
    
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
    
        const savedUser = await newUser.save();
    
        const token = generateAuthToken(newUser);
    
        res.send(token);
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error});
    }

})

module.exports = router;
