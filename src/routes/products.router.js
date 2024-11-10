// /routes/products.router.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Ruta para obtener productos con filtros, paginación y ordenamiento
router.get('/', productController.getAllProducts);

module.exports = router;
