const { col } = require('sequelize');
const Coleccion = require('../models/coleccion');
const SubColeccion = require('../models/SubColeccion');

const get = async (req, res) => {
    try {
        const colecciones = await Coleccion.findAll();
        res.json(colecciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener las colecciones' });
    }
};
const getById = async (req, res) => {
    try {
      const id = req.params.id;
      const coleccion = await Coleccion.findByPk(id);
      if (!coleccion) {
        res.status(404).json({ mensaje: 'Coleccion no encontrada' });
      } else {
        res.json(coleccion);
      }
    } catch (error) {
      //console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener Coleccion' });
    }
  };
  const create = async (req, res) => {
    try {
      console.log(req.body); 
      const { nombre} = req.body;
      if (!nombre) {
        res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
        return;
      }
      const coleccion = await Coleccion.create({nombre});
      res.json(coleccion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al crear Coleccion' });
    }
  };
  const update = async (req, res) => {
    try {
      const id = req.params.id;
      const {nombre} = req.body;
      const coleccion = await Coleccion.findByPk(id);
      if (!coleccion) {
        res.status(404).json({ mensaje: 'Coleccion no encontrada' });
      } else if(!nombre){
          res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
          return;
      }
      else{
        coleccion.nombre = nombre; 
        await coleccion.save();
        res.json(coleccion);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al actualizar Coleccion' });
    }
  };
  
  
  const destroy = async (req, res) => {
    try {
      const id = req.params.id;
      const coleccion = await Coleccion.findByPk(id);
      if (!coleccion) {
        res.status(404).json({ mensaje: 'Coleccion no encontrada' });
      } else {
        await coleccion.destroy();
        res.json({ mensaje: 'Coleccion eliminada' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al eliminar Coleccion' });
    }
  };  
  const getSubcoleccion = async(req,res)=>{
    const coleccionId = req.params.id;
    try {
      const subColecciones = await SubColeccion.findAll({
        where: { coleccionId }
      });
  
      if (subColecciones.length === 0) {
        return res.status(404).json({ error: 'No se encontraron SubColecciones para esta Coleccion' });
      }
  
      res.status(200).json(subColecciones);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener las SubColecciones' });
    }
  }
module.exports = {
    get,
    getById,
    create,
    update,
    destroy,
    getSubcoleccion
};  