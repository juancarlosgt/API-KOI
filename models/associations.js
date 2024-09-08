const Usuario = require('./usuario');
const Carrito = require('./carrito');
const ItemCarrito = require('./itemCarrito');
const Coleccion = require('./coleccion');
const SubColeccion = require('./SubColeccion');
const Camiseta = require('./camiseta');
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
}