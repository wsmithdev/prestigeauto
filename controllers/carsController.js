const Car = require("../models/Car");

// Get all cars in db
module.exports.showCars_get = async (req, res) => {
  try {
    // Find and return all cars in db
    const cars = await Car.find();
    // Set status and return cars data
    res.status(200).json(cars);
    console.log(cars);
  } catch (err) {
    console.log(err);
    res.status(400).send("error, cars not found");
  }
};

// Find car by id
module.exports.findCar_get = async (req, res) => {
  const id = req.params.carId;

  try {
    // Find car by id
    const car = await Car.findById(id);
    // Set status and return car data
    res.status(200).json(car);
    console.log(car);
  } catch (err) {
    console.log(err);
    res.status(400).send("error, car not found");
  }
};

// Find cars by make
module.exports.findCarsByMake_get = async (req, res) => {
  const make = req.params.make;

  try {
    // Find car by make
    const cars = await Car.filterByName(make);
    // Create array with car objects to return
    
    // Set status and return cars data
    res.status(200).json(cars);

  } catch (err) {
    console.log(err);
    res.status(400).send("error, car not found");
  }
  
}

// Add new car to db
module.exports.addCar_post = async (req, res) => {
  const {
    year,
    make,
    model,
    info,
    band,
    seats,
    type,
    booked,
    power,
    transmission,
    convertible,
    imagesURL,
  } = req.body;

  try {
    // Create car in db
    const car = await Car.create({
      year,
      make,
      model,
      info,
      band,
      seats,
      type,
      booked,
      power,
      transmission,
      convertible,
      imagesURL,
    });
    // Send car ID
    res.status(201).json({ car_id: car._id });
  } catch (err) {
    console.log(err);
    res.status(400).send("error, car not created");
  }
};

// Update existing car in db
module.exports.updateCar_post = async (req, res) => {

  console.log("BE fired")
  
  const id = req.params.carId;
  const {
    year,
    make,
    model,
    info,
    band,
    seats,
    type,
    booked,
    power,
    transmission,
    convertible,
    imagesURL,
  } = req.body;

  try {
    // Find car by id and update
    const car = await Car.findByIdAndUpdate(
      id,
      {
        $set: {
          year: year,
          make: make,
          model: model,
          info: info,
          band: band,
          seats: seats,
          type: type,
          booked: booked,
          power: power,
          transmission: transmission,
        },
      },
      { upsert: true, new: true }
    );
    // Set status and return car data
    res.status(200).json(car);
    console.log(car);
  } catch (err) {
    console.log(err);
    res.status(400).send("error, car not updated");
  }
};

// Remove car from db
module.exports.removeCar_delete = async (req, res) => {
  const id = req.params.carId;

  try {
    // Find car by id and delete
    const car = await Car.findByIdAndDelete(id);
    // Set status and return car data
    res.status(200).json(car);
    console.log(car);
  } catch (err) {
    console.log(err);
    res.status(400).send("error, car not removed");
  }
};
