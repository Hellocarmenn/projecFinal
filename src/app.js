// app.js
const express = require('express');
const exphbs = require('express-handlebars');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Conectar a la base de datos
connectDB();

// Configuración de Handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());

// Rutas
const productRouter = require('./routes/products.router');
const cartRouter = require('./routes/carts.router');

app.use('/products', productRouter);
app.use('/carts', cartRouter);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
