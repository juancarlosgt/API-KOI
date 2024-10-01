const express = require("express");
const router = express.Router();
const { authenticate, authorizeAdmin } = require('../middleware/auth');
const colorController = require("../controllers/colorController");

router
  .get("/", colorController.get)
  .get("/:id",colorController.getById)
  .post("/",authenticate, authorizeAdmin,colorController.create,)
  .put("/:id",authenticate, authorizeAdmin,colorController.update)
  .delete("/:id",authenticate, authorizeAdmin,colorController.destroy)
module.exports = router; 