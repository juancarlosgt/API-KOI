require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');
const sequelize = require('./db');
const associations = require('./models/associations');
app.use(express.json());

const camisetaRouter = require("./routes/camisetaRouter");
const authRoutes = require('./routes/authRouter');
const carritoRouter = require('./routes/carritoRouter');
const coleccionRouter = require('./routes/coleccionRouter');
const subColeccionRouter = require('./routes/subColeccionRouter');
const coloresRouter = require('./routes/colorRouter');
const tipoCamisaRouter = require('./routes/tipoCamisaRouter');
//const pedidoRouter= require('./routes/pedidoRouter');

app.use(cors());
associations();

app.get("/api", (_, res) => {
  res.json({ message: "Hello from server!" });
});
app.use("/api/camisetas", camisetaRouter);
app.use('/api/auth', authRoutes);
app.use('/api/carrito',carritoRouter);
app.use('/api/colecciones',coleccionRouter);
app.use('/api/sub-colecciones',subColeccionRouter);
app.use('/api/colores',coloresRouter);
app.use('/api/tipo',tipoCamisaRouter)
//app.use('/api/pedido',pedidoRouter);

sequelize.sync({ force: false})
  .then(() => console.log('Base de datos sincronizada'))
  .catch(err => console.error('Error al sincronizar la base de datos', err));

app.listen(3000, () => {
  console.log(`Server start with port 3000`);
});