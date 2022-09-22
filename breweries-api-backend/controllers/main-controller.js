const { json } = require("express");
const express = require("express");
const router = express.Router();

const { requireToken, handleValidateOwnership } = require("../middleware/auth");
const { findById, find, findOneAndUpdate } = require("../models/User");
const User = require("../models/User");
const Comment = require("../models/Comment")

//favorites
    //route favorites array to profile page

//comments
    //difficulty with appending req.body from form on frontend to display as string comment on backend
    //page id should allow it to keep comments on page about brewery with fetch call
    //user id should allow matching users to realize CRUD operations on their comment

//----------------------------------------------------------->
//profile page
router.get("/profile", requireToken, async (req, res) => {
    try{
        const thisUser = await User.findOne({username: req.user.username})
        // console.log(thisUser)
        let jsonUser = JSON.stringify(thisUser)
        console.log(jsonUser)
        res.json(thisUser)
    } catch (error){
        res.status(400).json(error)
    }
  });
//----------------------------------------------------------->

//favorite
router.post('/favorites', requireToken, async(req, res) => {
    try{

        const thisUser = await User.findOne({username: req.user.username})
        // console.log(thisUser.username)
        let setFavorite = String(req.body.brewery)
        // console.log(setFavorite)

        if(thisUser.favorites.includes(setFavorite)){
            await User.findOneAndUpdate(
                {username: thisUser.username},
                {$pullAll: {favorites: [setFavorite] }}
            )
        } else {
            await User.findOneAndUpdate(
                {username: thisUser.username},
                {$push: {favorites: setFavorite}}
            )
        }

        res.status(200)
    } catch (error){
        res.status(400).json(error)
    }
})

//comment
router.post('/comment', requireToken, async (req, res) => {
    try{
        const thisUser = await User.findOne({username: req.user.username})
        const newComment = await Comment.create({
            username: thisUser.username,
            comment: req.body.comment,
            brewery: req.body.brewery
        })
        console.log(thisUser)
        console.log(newComment)
        res.status(200)
    } catch(error) {
        res.status(400).json(error)
    }
})

module.exports = router;