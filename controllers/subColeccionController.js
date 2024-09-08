
const SubColeccion = require('../models/SubColeccion');

const get = async (req, res) => {
    try {
        const subColecciones = await SubColeccion.findAll();
        res.json(subColecciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener las Subcolecciones' });
    }
};
const getById = async (req, res) => {
    try {
      const id = req.params.id;
      const subColeccion = await SubColeccion.findByPk(id);
      if (!subColeccion) {
        res.status(404).json({ mensaje: 'SubColeccion no encontrada' });
      } else {
        res.json(subColeccion);
      }
    } catch (error) {
      //console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener SubColeccion' });
    }
  };
  const create = async (req, res) => {
    try {
      console.log(req.body); 
      const { nombre,coleccionId} = req.body;
      if (!nombre || !coleccionId) {
        res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
        return;
      }
      const subColeccion = await SubColeccion.create({nombre,coleccionId});
      res.json(subColeccion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al crear SubColeccion' });
    }
  };
  const update = async (req, res) => {
    try {
      const id = req.params.id;
      const {nombre,coleccionId} = req.body;
      const subColeccion = await SubColeccion.findByPk(id);
      if (!subColeccion) {
        res.status(404).json({ mensaje: 'SubColeccion no encontrada' });
      } else if(!nombre){
          res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
          return;
      }
      else{
        subColeccion.nombre = nombre; 
        subColeccion.coleccionId = coleccionId;
        await subColeccion.save();
        res.json(subColeccion);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al actualizar SubColeccion' });
    }
  };
  
  
  const destroy = async (req, res) => {
    try {
      const id = req.params.id;
      const subColeccion = await SubColeccion.findByPk(id);
      if (!subColeccion) {
        res.status(404).json({ mensaje: 'SubColeccion no encontrada' });
      } else {
        await subColeccion.destroy();
        res.json({ mensaje: 'SubColeccion eliminada' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al eliminar SubColeccion' });
    }
  };  
module.exports = {
    get,
    getById,
    create,
    update,
    destroy
};  