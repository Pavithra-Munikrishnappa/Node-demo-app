// In-memory dummy "products" data store.
let products = [
  { id: 1, name: 'Wireless Mouse', category: 'Electronics', price: 19.99 },
  { id: 2, name: 'Mechanical Keyboard', category: 'Electronics', price: 59.99 },
  { id: 3, name: 'Standing Desk', category: 'Furniture', price: 249.0 },
  { id: 4, name: 'Noise Cancelling Headphones', category: 'Electronics', price: 129.5 }
];

function getAll() {
  return products;
}

function getById(id) {
  return products.find((p) => p.id === id);
}

function add(product) {
  products.push(product);
  return product;
}

function nextId() {
  return products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
}

module.exports = { getAll, getById, add, nextId };
