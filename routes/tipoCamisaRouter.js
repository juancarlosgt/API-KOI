//probar que todo funcione , precios de los items, etc, update user y que todo funcione jajaj
const express = require("express");
const router = express.Router();
const { authenticate, authorizeAdmin } = require('../middleware/auth');
const tipoCamisaController = require("../controllers/tipoCamisaController");

router
  .get("/", tipoCamisaController.get)
  .get("/:id",tipoCamisaController.getById)
  .post("/",authenticate, authorizeAdmin,tipoCamisaController.create,)
  .put("/:id",authenticate, authorizeAdmin,tipoCamisaController.update)
  .delete("/:id",authenticate, authorizeAdmin,tipoCamisaController.destroy)
module.exports = router; 