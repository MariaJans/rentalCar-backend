const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");


//registration
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      fullName: req.body.fullName,
      username: req.body.username,
      password: hashedPass,
      email: req.body.email,
      phonenumber: req.body.phonenumber,
      driverlisence: req.body.driverlisence,
    });
   
    
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(200).json(err);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if(!user) throw new Error("Wrong credentials!");
    console.log("entered")
    const validated = await bcrypt.compare(req.body.password, user.password);
    if(!validated) throw new Error("Wrong credentials!");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
module.exports = router;
