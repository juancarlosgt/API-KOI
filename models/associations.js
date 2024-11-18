const Usuario = require('./usuario');
const Carrito = require('./carrito');
const ItemCarrito = require('./itemCarrito');
const Coleccion = require('./coleccion');
const SubColeccion = require('./SubColeccion');
const Camiseta = require('./camiseta');
const TipoCamisa = require('./tipoCamisa');
const Color = require('./color');
const Imagen = require('./imagen')
// const Pedido = require('./pedido');
// const ItemPedido = require('./itemPedido');

module.exports = () => {
// Relación 1 a 1 entre Usuario y Carrito
Usuario.hasOne(Carrito, { foreignKey: 'userId' });
Carrito.belongsTo(Usuario, { foreignKey: 'userId' });

// Relación 1 a muchos entre Carrito y ItemCarrito
Carrito.hasMany(ItemCarrito, { as:'items', foreignKey: 'carritoId' });
ItemCarrito.belongsTo(Carrito, { foreignKey: 'carritoId' });

// Coleccion tiene muchas SubColecciones
Coleccion.hasMany(SubColeccion, { foreignKey: 'coleccionId', onDelete: 'CASCADE' });
SubColeccion.belongsTo(Coleccion, { foreignKey: 'coleccionId' });

// SubColeccion tiene muchas Camisetas
SubColeccion.hasMany(Camiseta, { foreignKey: 'subColeccionId', onDelete: 'CASCADE' });
Camiseta.belongsTo(SubColeccion, { foreignKey: 'subColeccionId' });

ItemCarrito.belongsTo(TipoCamisa, { foreignKey: 'tipoCamisaId' });
TipoCamisa.hasMany(ItemCarrito, { foreignKey: 'tipoCamisaId' });

// // Un usuario tiene muchos pedidos
// Usuario.hasMany(Pedido, { foreignKey: 'userId' });
// Pedido.belongsTo(Usuario, { foreignKey: 'userId' });

// // Un pedido tiene muchos items
// Pedido.hasMany(ItemPedido, { foreignKey: 'pedidoId' });
// ItemPedido.belongsTo(Pedido, { foreignKey: 'pedidoId' });

// // Un ItemPedido está relacionado con una camiseta
// ItemPedido.belongsTo(Camiseta, { foreignKey: 'productId' });

Camiseta.belongsToMany(Color, { through: 'Camiseta_Color' });
Color.belongsToMany(Camiseta, { through: 'Camiseta_Color'});

Camiseta.hasMany(Imagen, {foreignKey: 'camisetaId', onDelete: 'CASCADE'});// Campo de la tabla Imagen que referencia a Camiseta// Opcional: elimina las imágenes si se elimina la camiseta
Imagen.belongsTo(Camiseta, {foreignKey: 'camisetaId',});
}