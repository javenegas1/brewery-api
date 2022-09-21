const passport = require('passport')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Passport.js Strategy method for authenticating
const { Strategy, ExtractJwt } = require('passport-jwt')
const User = require('../models/User')
const secret = process.env.JWT_SECRET || 'yolo unique secrets'

const opts = {
	    // How passport should find and extract the token from
	  // the request.  We'll be sending it as a `bearer` token
	  // when we make requests from our front end.
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		// Any secret string to use that is unique to your app
	  // We should store this in an environment variable so it
	  // isn't ever pushed to GitHub!
      /*
      
      headers: {
        Authorization: 'bearer ....'
      }
      
      */ 
    secretOrKey: secret
}

const verify = async (jwt_payload, done) => {
		// In the callback we run our custom code. With the data extracted from
	  // the token that we're passed as jwt_payload we'll have the user's id.
	  // Using Mongoose's `.findById()` method, we find the user in our database
    try {
				// To pass the user on to our route, we use the `done` method that
		    // that was passed as part of the callback.  The first parameter of
		    // done is an error, so we'll pass null for that argument and then
		    // pass the user doc from Mongoose
        const user = await User.findById(jwt_payload.id)
        return done(null, user)
    }catch(err){
				// If there was an error, we pass it to done so it is eventually handled
		    // by error handlers in Express
       return done(err)
    }

}

const strategy = new Strategy(opts,verify)

passport.use(strategy)
passport.initialize()

const requireToken = passport.authenticate('jwt', {session: false})

const createUserToken = (req, user) => {
		if(
			!user ||
			!req.body.password ||
			!bcrypt.compareSync(req.body.password, user.password)
			){
	        const error = new Error("The provided username or password is incorrect")
	        error.statusCode = 422
	        throw error
    }
    return jwt.sign({id: user._id},secret,{expiresIn: 36000 })
}

module.exports = {
    requireToken,
    createUserToken
}