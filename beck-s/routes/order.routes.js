const express = require("express");
const router = express.Router();
const orderController = require("../controller/order.controller");

router.post("/orders", orderController.createOrder);
// router.get("/orders/:id", orderController.getOrderById);

module.exports = router;
