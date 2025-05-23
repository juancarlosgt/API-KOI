

const Camiseta = require('../models/camiseta');
const Color = require('../models/color')
const Imagen = require('../models/imagen')
const TipoCamisa = require('../models/tipoCamisa')
const Talla = require('../models/talla')
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
    const { nombre, lanzamiento, oferta, subColeccionId } = req.body;
    if (!nombre || !subColeccionId) {
      res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
      return;
    }
    const camiseta = await Camiseta.create({ nombre, lanzamiento, oferta, subColeccionId });
    res.json(camiseta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear camiseta' });
  }
};
const update = async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre, lanzamiento, oferta, subColeccionId } = req.body;
    const camiseta = await Camiseta.findByPk(id);
    if (!camiseta) {
      res.status(404).json({ mensaje: 'Camiseta no encontrada' });
    } else if (!nombre) {
      res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
      return;
    }
    else {
      camiseta.nombre = nombre;
      camiseta.lanzamiento = lanzamiento;
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
    return camisetas ? res.json(camisetas) : [];
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener camisetas en lanzamiento', error: error.message });
  }
}
const getOferta = async (req, res) => {
  try {
    const camisetas = await Camiseta.findAll({
      where: { oferta: true }
    });
    return camisetas ? res.json(camisetas) : [];
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener camisetas en lanzamiento', error: error.message });
  }
}

const getColor = async (req, res) => {
  const { camisetaId } = req.params;
  const camiseta = await Camiseta.findByPk(camisetaId, {
    include: Color
  });
  res.json(camiseta.Colors); // Asumiendo que la relación se llama Colores
}
const addColor = async (req, res) => {
  const { camisetaId, colorId } = req.params;
  const camiseta = await Camiseta.findByPk(camisetaId);
  await camiseta.addColor(colorId); // Método generado
  res.status(200).json({ message: 'Camiseta asociada al color' });
}
const deleteColor = async (req, res) => {
  const { camisetaId, colorId } = req.params;
  const camiseta = await Camiseta.findByPk(camisetaId);
  await camiseta.removeColor(colorId); // Método generado
  res.status(200).json({ message: 'Camiseta desasociada del color' });
}
const obtenerImagenesDeCamiseta = async (req, res) => {
  const { camisetaId } = req.params; // ID de la camiseta desde los parámetros de la solicitud

  try {
    const imagenes = await Imagen.findAll({
      where: { camisetaId }
    });

    if (imagenes.length === 0) {
      return res.status(404).json({ error: 'No se encontraron imágenes para esta camiseta' });
    }

    res.status(200).json(imagenes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las imágenes' });
  }
};
const agregarImagenACamiseta = async (req, res) => {
  const { camisetaId } = req.params;
  const { url } = req.body; // Asegúrate de que la URL de la imagen se envíe en el cuerpo de la solicitud

  try {
    const camiseta = await Camiseta.findByPk(camisetaId);
    if (!camiseta) {
      return res.status(404).json({ error: 'Camiseta no encontrada' });
    }

    const nuevaImagen = await Imagen.create({ url, camisetaId });
    res.status(201).json(nuevaImagen);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar la imagen' });
  }
};
const eliminarImagen = async (req, res) => {
  const { id } = req.params; // Asumiendo que el ID de la imagen se pasa como parámetro

  try {
    const deleted = await Imagen.destroy({
      where: { id }
    });

    if (deleted) {
      return res.status(204).json(); // No content
    }
    return res.status(404).json({ error: 'Imagen no encontrada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la imagen' });
  }
};



// const getTipo = async(req,res) =>{
//   const { camisetaId } = req.params;
//   const camiseta = await Camiseta.findByPk(camisetaId, {
//     include: TipoCamisa
//   });
//   res.json(camiseta.TipoCamisas); // Asumiendo que la relación se llama Colores
// }
// const addTipo = async(req,res) =>{
//   const { camisetaId, tipoId } = req.params;
//   const camiseta = await Camiseta.findByPk(camisetaId);
//   await camiseta.addTipoCamisa(tipoId); // Método generado
//   res.status(200).json({message:'Producto asociada al Tipo'});
// }
// const deleteTipo = async(req,res) =>{
//   const { camisetaId, tipoId } = req.params;
//   const camiseta = await Camiseta.findByPk(camisetaId);
//   await camiseta.removeTipoCamisa(tipoId); // Método generado
//   res.status(200).json({message:'Producto desasociado del tipo'});
// }
const getTipo = async (req, res) => {
  try {
    const { camisetaId } = req.params;
    const camiseta = await Camiseta.findByPk(camisetaId, {
      include: TipoCamisa
    });
    if (!camiseta) {
      return res.status(404).json({ message: 'Producto no encontrada' });
    }
    res.json(camiseta.TipoCamisas); 
  } catch (error) {
    console.error('Error al obtener tipos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

const addTipo = async (req, res) => {

  try {
    const { camisetaId, tipoId } = req.params;
    const camiseta = await Camiseta.findByPk(camisetaId);
    if (!camiseta) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    await camiseta.addTipoCamisa(tipoId); 
    res.status(200).json({ message: 'Producto asociado al Tipo' });
  } catch (error) {
    console.error('Error al agregar tipo:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}


const deleteTipo = async (req, res) => {
  try {
    const { camisetaId, tipoId } = req.params;
    const camiseta = await Camiseta.findByPk(camisetaId);
    if (!camiseta) {
      return res.status(404).json({ message: 'Camiseta no encontrada' });
    }
    await camiseta.removeTipoCamisa(tipoId);
    res.status(200).json({ message: 'Producto desasociado del tipo' });
  } catch (error) {
    console.error('Error al eliminar tipo:', error);
    res.status(500).json({ message: 'Error interno del servidor' });

  }

}

const getTalla = async (req, res) => {
  try {
    const { camisetaId } = req.params;
    const camiseta = await Camiseta.findByPk(camisetaId, {
      include: Talla
    });
    if (!camiseta) {
      return res.status(404).json({ message: 'Producto no encontrada' });
    }
    res.json(camiseta.Tallas); 
  } catch (error) {
    console.error('Error al obtener tallas:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

const addTalla = async (req, res) => {

  try {
    const { camisetaId, tallaId } = req.params;
    const camiseta = await Camiseta.findByPk(camisetaId);
    if (!camiseta) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    await camiseta.addTalla(tallaId); 
    res.status(200).json({ message: 'Producto asociado a la Talla' });
  } catch (error) {
    console.error('Error al agregar talla:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}


const deleteTalla = async (req, res) => {
  try {
    const { camisetaId, tallaId } = req.params;
    const camiseta = await Camiseta.findByPk(camisetaId);
    if (!camiseta) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    await camiseta.removeTalla(tallaId);
    res.status(200).json({ message: 'Producto desasociado de la talla' });
  } catch (error) {
    console.error('Error al eliminar talla:', error);
    res.status(500).json({ message: 'Error interno del servidor' });

  }

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
  deleteColor,
  agregarImagenACamiseta,
  eliminarImagen,
  obtenerImagenesDeCamiseta,
  getTipo,
  addTipo,
  deleteTipo,
  getTalla,
  addTalla,
  deleteTalla
};