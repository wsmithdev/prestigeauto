const User = require("../models/User");

// Create new booking
module.exports.bookCar_patch = async (req, res) => {
  const userId = req.params.id;
  const { carId, dates } = req.body;
};
