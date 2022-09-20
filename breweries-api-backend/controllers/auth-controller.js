const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt')

const User = require("../models/User");
const {createUserToken} = require('../middleware/auth')

//register
router.post("/register", async (req, res) => {
  try{
    const passwordHash = await bcrypt.hash(req.body.password, 10)
    req.body.password = passwordHash
    console.log(req.body)
    const newUser = await User.create(req.body)
    res.status(200).json({currentUser: newUser, isLoggedIn: true, })
  }catch(err){
    res.status(400).json({error: err.message})
  }
});

//login
router.post("/login", async (req, res) => {
    try{
        const logggingUser = req.body.username
        const foundUser = await User.findOne({username: logggingUser})
        const token = await createUserToken(req, foundUser)
        console.log("created token:", token)
        res.status(200).json({user: foundUser, isLoggedIn: true, token})
    }catch(err){
      res.status(400).json({error: err.message})
    }
});

module.exports = router;