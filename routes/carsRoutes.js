const { Router } = require("express");
const carsController = require("../controllers/carsController");
const middleWare = require('../middleware/authMiddleware')

const router = Router();

router.get("/cars", carsController.showCars_get);
router.get("/cars/:carId", carsController.findCar_get);
router.get("/cars/find/:make", carsController.findCarsByMake_get);
router.post("/cars/new", carsController.addCar_post);
router.patch("/cars/update/:carId", carsController.updateCar_post);
router.delete("/cars/delete/:carId", carsController.removeCar_delete);

module.exports = router;
