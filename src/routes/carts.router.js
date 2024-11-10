// /routes/carts.router.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Obtener carrito
router.get('/:cid', cartController.getCart);

// Agregar producto al carrito
router.put('/:cid/products/:pid', cartController.addProductToCart);

// Eliminar producto del carrito
router.delete('/:cid/products/:pid', cartController.removeProductFromCart);

module.exports = router;
