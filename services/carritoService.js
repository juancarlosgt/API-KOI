const Carrito = require('../models/carrito');
const ItemCarrito = require('../models/itemCarrito');
const Camiseta = require('../models/camiseta')


const addItemToCart = async (userId, productId, quantity,price,color) => {
    const carrito = await Carrito.findOne({ where: { userId } });
    const product = await Camiseta.findByPk(productId);
    
    const item = await ItemCarrito.findOne({ where: { carritoId: carrito.id, productId ,price,color} });
    if (item) {
      item.quantity += quantity;
      await item.save();
    } else {
      await ItemCarrito.create({
        carritoId: carrito.id,
        productId,
        quantity,
        price,
        color
      });
    }
  
    carrito.totalPrice += price * quantity;
    await carrito.save();
  };

  const removeItemFromCart = async (userId, id) => {
    try{
      const carrito = await Carrito.findOne({ where: { userId } });
      const item = await ItemCarrito.findOne({ where: { carritoId: carrito.id, id } });
    
    if (item) {
      carrito.totalPrice -= item.price * item.quantity;
      await item.destroy();
      await carrito.save();
    }
    }catch (error) {
      throw new Error('Error al eliminar del carrito ' + error.message);
    }
    
  };
  const getCartItemsByUser = async (userId) => {
    try {
      
      const [carrito, created] = await Carrito.findOrCreate({
        where: { userId },
        defaults: { userId },  
        include: [{ model: ItemCarrito, as: 'items' }]  
      });
  
      const items = carrito.items || [];
      return {
        totalPrice: carrito.totalPrice,
        items: items  
      };
    } catch (error) {
      throw new Error('Error al obtener o crear el carrito ' + error.message);
    }
  };  
module.exports = {
    addItemToCart,
    removeItemFromCart,
    getCartItemsByUser
}  