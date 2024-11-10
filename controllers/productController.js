// /controllers/productController.js
const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1, sort = '', query = '' } = req.query;
    const limitNum = parseInt(limit, 10);
    const pageNum = parseInt(page, 10);

    let filter = {};
    if (query) {
      filter = { $or: [{ category: query }, { availability: query }] };
    }

    let sortOption = {};
    if (sort === 'asc') {
      sortOption = { price: 1 };
    } else if (sort === 'desc') {
      sortOption = { price: -1 };
    }

    const products = await Product.find(filter)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .sort(sortOption);

    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limitNum);

    const prevPage = pageNum > 1 ? pageNum - 1 : null;
    const nextPage = pageNum < totalPages ? pageNum + 1 : null;
    const hasPrevPage = prevPage !== null;
    const hasNextPage = nextPage !== null;
    const prevLink = hasPrevPage ? `/products?page=${prevPage}&limit=${limitNum}&sort=${sort}&query=${query}` : null;
    const nextLink = hasNextPage ? `/products?page=${nextPage}&limit=${limitNum}&sort=${sort}&query=${query}` : null;

    res.json({
      status: 'success',
      payload: products,
      totalPages,
      prevPage,
      nextPage,
      page: pageNum,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink,
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};
