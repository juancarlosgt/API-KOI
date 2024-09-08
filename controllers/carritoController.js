const carritoService = require('../services/carritoService')

const addItemToCart = async (req, res) => {
  try {
    const userId = req.user.userId; // Suponiendo que ya tienes autenticación JWT
    const { productId,quantity ,price,color} = req.body;

    await carritoService.addItemToCart(userId, productId, quantity,price,color);
    res.status(200).json({ message: 'Artículo agregado al carrito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar artículo al carrito ' + error.message});
  }
};

const removeItemFromCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const id  = req.params.id;

    await carritoService.removeItemFromCart(userId, id);
    res.status(200).json({ message: 'Artículo eliminado del carrito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar artículo del carrito ' + error.message});
  }
};
const getCartItems = async (req, res) => {
    try {
      const userId = req.user.userId; // Obtener el ID del usuario autenticado
      const cartItems = await carritoService.getCartItemsByUser(userId);
      return res.status(200).json(cartItems);
    } catch (error) {  
      return res.status(500).json({ message: 'Error al obtener los items del carrito', "error":error.message});
    }
  };
module.exports = {
  addItemToCart,
  removeItemFromCart,
  getCartItems
};
