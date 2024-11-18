
// const { Sequelize } = require('sequelize');

// const db = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASS, {
//   host: process.env.DB_HOST,
//   dialect: 'mysql'
// });

// module.exports = db;
// const { Sequelize } = require('sequelize');

// // Configura la ruta de tu archivo de base de datos SQLite
// const db = new Sequelize({
//   dialect: 'sqlite',
//   storage: './db.sqlite', // Ruta al archivo de base de datos SQLite
// });

// module.exports = db;
const { Sequelize } = require('sequelize');

// Usando la URL de conexión completa
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  logging: false, // Opcional, para desactivar el log de consultas
});

// Test de conexión
sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch(err => {
    console.error('Error de conexión:', err);
  });
  module.exports = sequelize;
