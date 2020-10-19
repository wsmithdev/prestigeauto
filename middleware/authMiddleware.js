const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Require authentication
const requireAuth = (req, res, next) => {
  const token = req.cookies.JWT

  // Check if token exists and verified
  if (token) {
    jwt.verify(token, "ejlkjieuwqdjlaje", (err, decodedToken) => {
      // Redirect to login page if token verification failed
      if (err) {
        console.log(`An error occured, message: ${err.message}`);
      }
      // Call next if verification was succesful
      else if (decodedToken) {
        console.log('Token verified')
        next();
      }
    });
  }
  // Redirect to login page if token does not exist
  else {
    console.log('No JWT token was found, sign in')
  }
};

// Retrieve user data
const retrieveUserData = (req, res, next) => {
  const token = req.cookies.jwt;

  // Check if token exists and verified
  if (token) {
    jwt.verify(token, "ejlkjieuwqdjlaje", async (err, decodedToken) => {
      // Log error if token verification failed
      if (err) {
        console.log(err.message);
        // Set 'user' value to null if verification failed
        res.locals.user = null;
        next();
      }
      // Find and return user data
      else if (decodedToken) {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  }
  // Set 'user' value to null if verification failed
  else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, retrieveUserData };
