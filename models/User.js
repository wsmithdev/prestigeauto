const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// User model
const userSchema = new mongoose.Schema({
  pictureURL: {
    type: String,
    default: ""
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  membership: {
    type: String,
    required: true,
    default: "none"
  },
  points: {
    type: Number,
    required: true,
    default: 0
  },
  prevBookings: {
    type: String,
  },
  currentBookings: {
    type: String,
  },
});

// Hash password before saving to db
userSchema.pre("save", async function (next) {
  // Generate salt
  const salt = await bcrypt.genSalt();
  // Hash password
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Static method to login user
userSchema.statics.login = async function (email, password) {
  // Check if email entered exists in db
  const user = await this.findOne({ email });
  // Compare entered password to hashed password in db
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    // Throw error if passwords do not match
    throw Error("incorrect password");
  }
  // Throw error if user email is not found
  throw Error("incorrect email");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
