const { json } = require("express");
const express = require("express");
const router = express.Router();

const { requireToken, handleValidateOwnership } = require("../middleware/auth");
const { findById, find, findOneAndUpdate } = require("../models/User");
const User = require("../models/User");
const Comment = require("../models/Comment")

//comments
    //difficulty with appending req.body from form on frontend to display as string comment on backend
    //page id should allow it to keep comments on page about brewery with fetch call
    //user id should allow matching users to realize CRUD operations on their comment

//profile page
router.get("/profile", requireToken, async (req, res) => {
    try{
        const thisUser = await User.findOne({username: req.user.username})
        let jsonUser = JSON.stringify(thisUser)
        console.log(jsonUser)

        const userComments = await Comment.find({username: req.user.username})
        console.log(userComments)

        res.json(thisUser)
    } catch (error){
        res.status(400).json(error)
    }
  });

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
        // console.log(req.body)
        const newComment = await Comment.create({
            username: thisUser.username,
            brewery: req.body.comment.brewery,
            comment: req.body.comment.comment
        })
        console.log(newComment)
        res.status(200)
    } catch(error) {
        res.status(400).json(error)
    }
})

//retrieve comments for one user
router.get("/user-comments", requireToken, async (req, res) => {
    try{
        const userComments = await Comment.find({username: req.user.username})
        console.log(userComments)

        res.json(userComments)
    } catch (error){
        res.status(400).json(error)
    }
  });
module.exports = router;