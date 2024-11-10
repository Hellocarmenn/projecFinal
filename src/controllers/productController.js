// src/controllers/productController.js
const Product = require('../models/Product'); // Si tienes un modelo de producto

// Controlador para obtener todos los productos con filtros y paginación
const getAllProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1, query = '', sort = 'asc' } = req.query;

    // Paginación y filtros
    const products = await Product.find({ name: { $regex: query, $options: 'i' } })
      .sort({ price: sort === 'asc' ? 1 : -1 })
      .limit(Number(limit))
      .skip((page - 1) * limit);

    const totalProducts = await Product.countDocuments({ name: { $regex: query, $options: 'i' } });

    const totalPages = Math.ceil(totalProducts / limit);
    const prevPage = page > 1 ? page - 1 : null;
    const nextPage = page < totalPages ? page + 1 : null;

    return res.json({
      status: 'success',
      payload: products,
      totalPages,
      prevPage,
      nextPage,
      page,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      prevLink: prevPage ? `/products?page=${prevPage}&limit=${limit}` : null,
      nextLink: nextPage ? `/products?page=${nextPage}&limit=${limit}` : null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  getAllProducts,
};
