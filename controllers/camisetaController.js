

const Camiseta = require('../models/camiseta');
const Color = require('../models/color')

const get = async (req, res) => {
  try {
    const camisetas = await Camiseta.findAll();
    res.json(camisetas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener camisetas' });
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const camiseta = await Camiseta.findByPk(id);
    if (!camiseta) {
      res.status(404).json({ mensaje: 'Camiseta no encontrada' });
    } else {
      res.json(camiseta);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener camiseta' });
  }
};

const create = async (req, res) => {
    try {
      console.log(req.body); 
      const { nombre, imagen,lanzamiento,oferta,subColeccionId} = req.body;
      if (!nombre || !imagen || !subColeccionId) {
        res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
        return;
      }
      const camiseta = await Camiseta.create({ nombre, imagen,lanzamiento,oferta,subColeccionId });
      res.json(camiseta);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al crear camiseta' });
    }
  };
const update = async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre, imagen,lanzamiento,oferta,subColeccionId} = req.body;
    const camiseta = await Camiseta.findByPk(id);
    if (!camiseta) {
      res.status(404).json({ mensaje: 'Camiseta no encontrada' });
    } else if(!nombre || !imagen){
        res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
        return;
    }
    else{
      camiseta.nombre = nombre;
      camiseta.imagen = imagen;
      camiseta.lanzamiento = lanzamiento ;
      camiseta.oferta = oferta;
      camiseta.subColeccionId = subColeccionId;  
      await camiseta.save();
      res.json(camiseta);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar camiseta' });
  }
};


const destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const camiseta = await Camiseta.findByPk(id);
    if (!camiseta) {
      res.status(404).json({ mensaje: 'Camiseta no encontrada' });
    } else {
      await camiseta.destroy();
      res.json({ mensaje: 'Camiseta eliminada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar camiseta' });
  }
};

const getLanzamiento = async (req, res) => {
  try {
    const camisetas = await Camiseta.findAll({
      where: { lanzamiento: true }
    });
    return camisetas?res.json(camisetas): [];
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener camisetas en lanzamiento', error: error.message });
  }
}
const getOferta = async (req, res) => {
  try {
    const camisetas = await Camiseta.findAll({
      where: { oferta: true }
    });
    return camisetas?res.json(camisetas): [];
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener camisetas en lanzamiento', error: error.message });
  }
}

const getColor = async(req,res) =>{
  const { camisetaId } = req.params;
  const camiseta = await Camiseta.findByPk(camisetaId, {
    include: Color
  });
  res.json(camiseta.Colors); // Asumiendo que la relación se llama Colores
}
const addColor = async(req,res) =>{
  const { camisetaId, colorId } = req.params;
  const camiseta = await Camiseta.findByPk(camisetaId);
  await camiseta.addColor(colorId); // Método generado
  res.status(200).json({message:'Camiseta asociada al color'});
}
const deleteColor = async(req,res) =>{
  const { camisetaId, colorId } = req.params;
  const camiseta = await Camiseta.findByPk(camisetaId);
  await camiseta.removeColor(colorId); // Método generado
  res.status(200).json({message:'Camiseta desasociada del color'});
}
module.exports = {
 get,
 getById,
 create,
 update,
 destroy,
 getLanzamiento,
 getOferta,
 getColor,
 addColor,
 deleteColor
};