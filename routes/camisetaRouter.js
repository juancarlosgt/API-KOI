const express = require("express");
const router = express.Router();
const { authenticate, authorizeAdmin } = require('../middleware/auth');
const camisetaController = require("../controllers/camisetaController");

router
  .get("/", camisetaController.get)
  .get("/:id",camisetaController.getById)
  .get("/lanzamiento",camisetaController.getLanzamiento)
  .get("/oferta",camisetaController.getOferta)
  .post("/",authenticate, authorizeAdmin,camisetaController.create,)
  .put("/:id",authenticate, authorizeAdmin,camisetaController.update)
  .delete("/:id",authenticate, authorizeAdmin,camisetaController.destroy)
module.exports = router;  