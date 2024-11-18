const { col } = require('sequelize');
const Talla = require('../models/talla');

const get = async (req, res) => {
    try {
        const tallas = await Talla.findAll();
        res.json(tallas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener las tallas' });
    }
};
const getById = async (req, res) => {
    try {
      const id = req.params.id;
      const talla = await Talla.findByPk(id);
      if (!talla) {
        res.status(404).json({ mensaje: 'Talla no encontrada' });
      } else {
        res.json(talla);
      }
    } catch (error) {
      //console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener Talla' });
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
      const talla = await Talla.create({nombre});
      res.json(talla);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al crear Talla' });
    }
  };
  const update = async (req, res) => {
    try {
      const id = req.params.id;
      const {nombre} = req.body;
      const talla = await Talla.findByPk(id);
      if (!talla) {
        res.status(404).json({ mensaje: 'Talla no encontrada' });
      } else if(!nombre){
          res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
          return;
      }
      else{
        talla.nombre = nombre; 
        await talla.save();
        res.json(talla);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al actualizar Talla' });
    }
  };
  
  
  const destroy = async (req, res) => {
    try {
      const id = req.params.id;
      const talla = await Talla.findByPk(id);
      if (!talla) {
        res.status(404).json({ mensaje: 'Talla no encontrada' });
      } else {
        await talla.destroy();
        res.json({ mensaje: 'Talla eliminada' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al eliminar Talla' });
    }
  };  
module.exports = {
    get,
    getById,
    create,
    update,
    destroy
};  