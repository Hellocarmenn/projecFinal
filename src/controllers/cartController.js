// /controllers/cartController.js
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Obtener carrito por ID y popular productos
exports.getCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await Cart.findById(cid).populate('products.productId');
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    res.json({ status: 'success', payload: cart });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

// Agregar producto al carrito
exports.addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    let cart = await Cart.findById(cid);
    if (!cart) {
      cart = new Cart({ products: [] });
    }

    const productIndex = cart.products.findIndex(p => p.productId.toString() === pid);
    if (productIndex === -1) {
      cart.products.push({ productId: pid, quantity });
    } else {
      cart.products[productIndex].quantity += quantity;
    }

    await cart.save();
    res.json({ status: 'success', payload: cart });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

// Eliminar producto del carrito
exports.removeProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

    cart.products = cart.products.filter(p => p.productId.toString() !== pid);
    await cart.save();
    res.json({ status: 'success', payload: cart });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};
