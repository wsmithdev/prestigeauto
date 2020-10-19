const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createToken = (id, membership) => {
  return jwt.sign({ id, membership }, "ejlkjieuwqdjlaje", {
    expiresIn: 24 * 60 * 60,
  });
};

// Create new user
module.exports.signup_post = async (req, res) => {
  const {
    pictureURL,
    name,
    surname,
    email,
    password,
    membership,
    points,
    prevBookings,
    currentBookings,
  } = req.body;

  try {
    // Create user in db
    const user = await User.create({
      pictureURL,
      name,
      surname,
      email,
      password,
      membership,
      points,
      prevBookings,
      currentBookings,
    });
    // Create JWT
    const token = createToken(user._id, user.membership);
    // Create cookie with JWT info
    res.cookie("JWT", token);
    // Send user ID
    res.status(201).json({ user: user._id });
  } catch (err) {
    console.log(err);
    res.status(400).send("error, user not created");
  }
};

// Login existing user
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Call login funtion created in User.js
    const user = await User.login(email, password);
    // Create JWT
    const token = createToken(user._id);
    // Create cookie with JWT info
    res.cookie("JWT", token);
    // Send user ID
    res.status(200).json({ user: user._id });
  } catch (err) {
    res.status(400).json({err});
  }
};

// Logout
module.exports.logout_get = (req, res) => {
  res.cookie("JWT", "", { maxAge: 1 });
  res.redirect("/");
};

// Get user data
module.exports.user_get = (req, res) => {
  const token = req.cookies.JWT;

  // Check if token exists and verified
  if (token) {
    jwt.verify(token, "ejlkjieuwqdjlaje", async (err, decodedToken) => {
      // Log error if token verification failed
      if (err) {
        res.status(401).json({
          error: "401",
        });
      }
      // Find and return user data
      else if (decodedToken) {
        let user = await User.findById(decodedToken.id);
        res.status(200).json(user);
      }
    });
  }
  // Set 'user' value to null if verification failed
  else {
    res.status(401).json({
      error: "401",
    });
  }
};

// Update user data
module.exports.updateUser_patch = async (req, res) => {
  console.log("BE function triggered")
  const id = req.params.id;
  console.log(`User id is: ${id}`)
  const {
    pictureURL,
    name,
    surname,
    points
  } = req.body;

  console.log(`Picture URL is ${pictureURL}`)

  try {
    // Find user by id and update
    const user = await User.findByIdAndUpdate(id, {
      $set: {
        pictureURL: pictureURL,
        name: name,
        surname: surname
      }
    },
    { upsert: true, new: true })
    // Set status and return car data
    res.status(200).json(user);
    console.log(user);

  } catch (err) {
    console.log(err);
    res.status(400).send("error, user not updated");
  }
};
