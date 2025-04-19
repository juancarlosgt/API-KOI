const Carrito = require('../models/carrito');
const ItemCarrito = require('../models/itemCarrito');
const Camiseta = require('../models/camiseta')
const TipoCamisa = require('../models/tipoCamisa')
// const Pedido = require('../models/pedido');
// const ItemPedido = require('../models/itemPedido');


const addItemToCart = async (userId, productId, tipoCamisaId, cantidad, color,talla) => {
  const carrito = await Carrito.findOne({ where: { userId } });
  const product = await Camiseta.findByPk(productId);
  const tipo = await TipoCamisa.findByPk(tipoCamisaId);
  if (!tipo) {
    throw new Error('TipoCamisa no encontrado');
  }
  //const item = await ItemCarrito.findOne({ where: { carritoId: carrito.id, productId, price, color } });
  //if (item) {
  //  item.cantidad += cantidad;
  //await item.save();
  //} else {
  await ItemCarrito.create({
    carritoId: carrito.id,
    productId:product.id,
    nombre:product.nombre,
    tipoCamisaId: tipo.id,
    cantidad,
    precio: tipo.precio,
    color,
    talla
  });
  //}

  carrito.totalPrice += tipo.precio * cantidad;
  await carrito.save();
};

const removeItemFromCart = async (userId, id) => {
  try {
    const carrito = await Carrito.findOne({ where: { userId } });
    const item = await ItemCarrito.findOne({ where: { carritoId: carrito.id, id } });

    if (item) {
      carrito.totalPrice -= item.precio * item.cantidad;
      await item.destroy();
      await carrito.save();
    }
  } catch (error) {
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
    var precio=0;
    items.forEach(item => {
      precio+=item.precio * item.cantidad
    });
    carrito.totalPrice=precio;
    return {
      totalPrice: carrito.totalPrice,
      items: items
    };
  } catch (error) {
    throw new Error('Error al obtener o crear el carrito ' + error.message);
  }
};


// const createPedidoFromCarrito = async (userId) => {
//   try {
//     // Obtener el carrito del usuario
//     const carrito = await Carrito.findOne({ where: { userId }, include: [ItemCarrito] });
//     if (!carrito || carrito.ItemsCarrito.length === 0) {
//       throw new Error('El carrito está vacío');
//     }

//     // Calcular el total del pedido
//     const total = carrito.ItemsCarrito.reduce((sum, item) => {
//       return sum + item.cantidad * item.Camiseta.precio;
//     }, 0);

//     // Crear el pedido
//     const pedido = await Pedido.create({
//       userId,
//       total,
//     });

//     // Mover los items del carrito al pedido
//     const itemsPedido = carrito.ItemsCarrito.map((item) => ({
//       pedidoId: pedido.id,
//       productId: item.productId,
//       cantidad: item.cantidad,
//       precioUnitario: item.Camiseta.precio,
//     }));
//     await ItemPedido.bulkCreate(itemsPedido);

//     // Limpiar el carrito
//     await ItemCarrito.destroy({ where: { carritoId: carrito.id } });

//     return pedido;
//   } catch (error) {
//     throw new Error('Error al crear el pedido: ' + error.message);
//   }
// };
module.exports = {
  addItemToCart,
  removeItemFromCart,
  getCartItemsByUser,
  //createPedidoFromCarrito
}  
