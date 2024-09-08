const express = require("express");
const router = express.Router();
const { authenticate, authorizeAdmin } = require('../middleware/auth');
const subColeccionController = require("../controllers/subColeccionController");

router
  .get("/", subColeccionController.get)
  .get("/:id",subColeccionController.getById)
  .post("/",authenticate, authorizeAdmin,subColeccionController.create,)
  .put("/:id",authenticate, authorizeAdmin,subColeccionController.update)
  .delete("/:id",authenticate, authorizeAdmin,subColeccionController.destroy)
module.exports = router; 