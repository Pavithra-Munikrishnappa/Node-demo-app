const productService = require('../services/productService');

// GET /api/products
function listProducts(req, res) {
  res.json(productService.getAllProducts());
}

// GET /api/products/:id
function getProduct(req, res) {
  const id = Number(req.params.id);
  const product = productService.getProductById(id);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json(product);
}

// POST /api/products
// Body (all optional): { "name": "...", "category": "...", "price": 99.99 }
// Any field left out is filled in with random dummy data.
function createProduct(req, res) {
  const { name, category, price } = req.body || {};
  const product = productService.createRandomProduct({ name, category, price });
  res.status(201).json(product);
}

module.exports = { listProducts, getProduct, createProduct };
