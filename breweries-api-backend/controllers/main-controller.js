const { json } = require("express");
const express = require("express");
const router = express.Router();

const { requireToken, handleValidateOwnership } = require("../middleware/auth");
const { findById, find, findOneAndUpdate } = require("../models/User");
const User = require("../models/User");

//overrall, not understanding how to access current user with token on the frontend
//and translate this to the backend where i can fulfill http requests

//favorites
    //receive response from front end in form of string that can be pushed into array
    //string should be id || params.id (from the route) from frontend of brewery page
    //favorites can then be mapped out similar to search page fetch call

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

module.exports = router;