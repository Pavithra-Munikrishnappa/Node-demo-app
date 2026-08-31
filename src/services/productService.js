const productsData = require('../data/products');

const PRODUCT_NAMES = ['Bluetooth Speaker', 'Gaming Chair', 'USB-C Hub', '4K Monitor', 'Webcam', 'Desk Lamp'];
const CATEGORIES = ['Electronics', 'Furniture', 'Accessories', 'Office'];

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function randomPrice() {
  return Number((Math.random() * 200 + 10).toFixed(2));
}

function getAllProducts() {
  return productsData.getAll();
}

function getProductById(id) {
  return productsData.getById(id);
}

// Creates a new product with randomly generated dummy details, used for
// the POST /api/products demo endpoint.
function createRandomProduct(overrides = {}) {
  const newProduct = {
    id: productsData.nextId(),
    name: overrides.name || pickRandom(PRODUCT_NAMES),
    category: overrides.category || pickRandom(CATEGORIES),
    price: overrides.price !== undefined ? overrides.price : randomPrice()
  };

  return productsData.add(newProduct);
}

module.exports = { getAllProducts, getProductById, createRandomProduct };
