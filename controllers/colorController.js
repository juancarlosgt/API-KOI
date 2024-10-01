const { col } = require('sequelize');
const Color = require('../models/color');

const get = async (req, res) => {
    try {
        const colores = await Color.findAll();
        res.json(colores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener los colores' });
    }
};
const getById = async (req, res) => {
    try {
      const id = req.params.id;
      const color = await Color.findByPk(id);
      if (!color) {
        res.status(404).json({ mensaje: 'Color no encontrada' });
      } else {
        res.json(color);
      }
    } catch (error) {
      //console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener color' });
    }
  };
  const create = async (req, res) => {
    try {
      console.log(req.body); 
      const { hex} = req.body;
      if (!hex) {
        res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
        return;
      }
      const color = await Color.create({hex});
      res.json(color);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al crear Color' });
    }
  };
  const update = async (req, res) => {
    try {
      const id = req.params.id;
      const {hex} = req.body;
      const color = await Color.findByPk(id);
      if (!color) {
        res.status(404).json({ mensaje: 'Color no encontrado' });
      } else if(!hex){
          res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
          return;
      }
      else{
        color.hex = hex; 
        await color.save();
        res.json(color);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al actualizar Color' });
    }
  };
  
  
  const destroy = async (req, res) => {
    try {
      const id = req.params.id;
      const color = await Color.findByPk(id);
      if (!color) {
        res.status(404).json({ mensaje: 'Color no encontrado' });
      } else {
        await color.destroy();
        res.json({ mensaje: 'Color eliminada' , "color":color});
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al eliminar Color' });
    }
  };  
module.exports = {
    get,
    getById,
    create,
    update,
    destroy
};  