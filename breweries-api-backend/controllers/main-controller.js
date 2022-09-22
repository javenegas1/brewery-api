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
    //most likely will be separate schema 
    //will have three keys (for now), page id, user id, and comment string
    //page id should allow it to keep comments on page about brewery with fetch call
    //user id should allow matching users to realize CRUD operations on their comment

//setup events?
    //most likely separate schema that will take in 4 keys (for now)
    //user, location(brewery id), date, and small paragraph
    //individual brewery page can call from this DB to fetch matching id's and list 
    //events that fall under that brewery 

//----------------------------------------------------------->
//profile page
// router.get("/profile", requireToken, async (req, res) => {
//     try{
//         const thisUser = await User.findOne({username: req.user.username})
//         console.log(thisUser)
//         res.json(thisUser)
//     } catch (error){
//         res.status(400).json(error)
//     }
//   });
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