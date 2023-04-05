const { User } = require("../models/user");
const { isUser, isAdmin } = require("../middleware/auth");
const moment = require("moment")
const bcrypt = require('bcrypt');

const router = require("express").Router();

//GET Users

router.get("/", isAdmin, async (req, res) => {
  
    try {
      const users =  await User.find().sort({ _id: -1 })
      res.status(200).send(users);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

//GET User

router.get("/find/:id", isUser, async (req, res) => {
  
    try {
      const user =  await User.findById(req.params.id);
      res.status(200).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });


//Update User

router.put("/:id", isUser, async (req, res) => {
  
    try {
      const user =  await User.findById(req.params.id);
      if(!user.email === req.body.email) {
        const sameEmail = await User.findByOne({eamil: req.body.email});
        if(sameEmail) 
        return res.status(400).send("The email is areadly taken");
      }

      if(req.body.password && user) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        user.password = hashedPassword;
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            isAdmin: req.body.isAdmin,
            password: user.password
        },
        {new: true}
      )
      res.status(200).send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

// DELETE USERS

router.delete('/:id',isAdmin ,async(req, res) => {
    try {
        const deletedUser = await User.findByIdAndRemove(req.params.id);

        res.status(200).send(deletedUser)

    } catch (error) {
        res.status(500).send(error);
    }
} )

// GET USER STATS 

//Getting Last Previous month stats
router.get("/stats", isAdmin ,async (req, res) => {
    const previousMonth = moment()
    .month(moment().month() -1)
    .set("date", 1) // Setting from day one --you casn change
    .format("yyyy-MM-DD HH:mm:ss");
    try {
        const users = await User.aggregate([
            {
                $match: {createdAt: { $gte: new Date(previousMonth) }},
            },
            {
                $project:{
                    month: {$month: "$createdAt"}
                }
             },
             {
                $group: {
                    _id: "$month",
                    total: {$sum: 1}
                }
             }

        ])
        res.status(200).send(users);
    } catch (error) {
        console.log(error);
        res.status(500).send( error.message );
    }

    // res.send(previousMonth);
})

module.exports = router;