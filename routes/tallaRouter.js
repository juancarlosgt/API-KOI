const express = require("express");
const router = express.Router();
const { authenticate, authorizeAdmin } = require('../middleware/auth');
const tallaController = require("../controllers/tallaController");

router
  .get("/", tallaController.get)
  .get("/:id",tallaController.getById)
  .post("/",authenticate, authorizeAdmin,tallaController.create,)
  .put("/:id",authenticate, authorizeAdmin,tallaController.update)
  .delete("/:id",authenticate, authorizeAdmin,tallaController.destroy)
module.exports = router; 