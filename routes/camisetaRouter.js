const express = require("express");
const router = express.Router();
const { authenticate, authorizeAdmin } = require('../middleware/auth');
const camisetaController = require("../controllers/camisetaController");

router
  .get("/", camisetaController.get)
  .get("/lanzamiento",camisetaController.getLanzamiento)
  .get("/oferta",camisetaController.getOferta)
  .get("/:camisetaId/colores/",camisetaController.getColor)
  .get("/:camisetaId/tipos/",camisetaController.getTipo)
  .get("/:camisetaId/tallas/",camisetaController.getTalla)
  .get('/:camisetaId/imagenes', camisetaController.obtenerImagenesDeCamiseta)
  .get("/:id",camisetaController.getById)
  .post("/",authenticate, authorizeAdmin,camisetaController.create,)
  .post("/:camisetaId/colores/:colorId",authenticate,authorizeAdmin,camisetaController.addColor)
  .post('/:camisetaId/imagenes', authenticate,authorizeAdmin,camisetaController.agregarImagenACamiseta)
  .post("/:camisetaId/tipos/:tipoId",authenticate,authorizeAdmin,camisetaController.addTipo)
  .post("/:camisetaId/tallas/:tallaId",authenticate,authorizeAdmin,camisetaController.addTalla)
  .put("/:id",authenticate, authorizeAdmin,camisetaController.update)
  .delete("/:id",authenticate, authorizeAdmin,camisetaController.destroy)
  .delete("/:camisetaId/colores/:colorId",authenticate,authorizeAdmin,camisetaController.deleteColor)
  .delete("/:camisetaId/tipos/:tipoId",authenticate,authorizeAdmin,camisetaController.deleteTipo)
  .delete("/:camisetaId/tallas/:tallaId",authenticate,authorizeAdmin,camisetaController.deleteTalla)
  .delete('/imagenes/:id',authenticate,authorizeAdmin,camisetaController.eliminarImagen)
module.exports = router;  