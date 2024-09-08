const express = require("express");
const router = express.Router();
const { authenticate, authorizeAdmin } = require('../middleware/auth');
const coleccionController = require("../controllers/coleccionController");

router
  .get("/", coleccionController.get)
  .get("/:id",coleccionController.getById)
  .post("/",authenticate, authorizeAdmin,coleccionController.create,)
  .put("/:id",authenticate, authorizeAdmin,coleccionController.update)
  .delete("/:id",authenticate, authorizeAdmin,coleccionController.destroy)
module.exports = router; 