const mongoose = require("mongoose");

// Car model 
const carSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    band: {
        type: String,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    power: {
        type: Number,
        required: true
    },
    transmission: {
        type: String,
        required: true
    },
    imagesURL: {
        type: Array,
        required: true
    }
});

// Static method to find car by make
carSchema.statics.filterByName = async function (make) {
    // Check if cars are in db
    const cars = await this.find({ "make": make});
    // Check if cars were found
    if (cars) {
        return cars
    } else {
        // Throw error if nothing was found
        throw Error("no cars found");
    }
}

const Car = mongoose.model('car', carSchema);

module.exports = Car;