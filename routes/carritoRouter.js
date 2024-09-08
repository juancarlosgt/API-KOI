const express = require("express");
const router = express.Router();
const { authenticate, authorizeAdmin } = require('../middleware/auth');
const carritoController = require("../controllers/carritoController");

router
  .get("/",authenticate,carritoController.getCartItems)
  .post("/",authenticate,carritoController.addItemToCart)  
  .delete("/:id",authenticate,carritoController.removeItemFromCart)
module.exports = router; 