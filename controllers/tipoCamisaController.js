
const TipoCamisa = require('../models/tipoCamisa');

const get = async (req, res) => {
    try {
        const tiposCamisa = await TipoCamisa.findAll();
        res.json(tiposCamisa);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener los tipos de camisa' });
    }
};
const getById = async (req, res) => {
    try {
      const id = req.params.id;
      const tipoCamisa = await TipoCamisa.findByPk(id);
      if (!tipoCamisa) {
        res.status(404).json({ mensaje: 'tipo de camisa no encontrado' });
      } else {
        res.json(tipoCamisa);
      }
    } catch (error) {
      //console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener tipo de camisa' });
    }
  };
  const create = async (req, res) => {
    try {
      console.log(req.body); 
      const { nombre,precio} = req.body;
      if (!nombre || !precio) {
        res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
        return;
      }
      const tipoCamisa = await TipoCamisa.create({nombre,precio});
      res.json(tipoCamisa);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al crear Tipo de Camisa' });
    }
  };
  const update = async (req, res) => {
    try {
      const id = req.params.id;
      const {nombre,precio} = req.body;
      const tipoCamisa = await TipoCamisa.findByPk(id);
      if (!tipoCamisa) {
        res.status(404).json({ mensaje: 'Tipo de camisa no encontrado' });
      } else if(!nombre || ! precio){
          res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
          return;
      }
      else{
        tipoCamisa.nombre = nombre; 
        tipoCamisa.precio = precio;
        await tipoCamisa.save();
        res.json(tipoCamisa);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al actualizar Tipo de Camisa' });
    }
  };
  
  
  const destroy = async (req, res) => {
    try {
      const id = req.params.id;
      const tipoCamisa = await TipoCamisa.findByPk(id);
      if (!tipoCamisa) {
        res.status(404).json({ mensaje: 'Tipo de camisa no encontrada' });
      } else {
        await tipoCamisa.destroy();
        res.json({ mensaje: 'Tipo de Camisa eliminada' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al eliminar Tipo de camisa' });
    }
  };  
module.exports = {
    get,
    getById,
    create,
    update,
    destroy
};  