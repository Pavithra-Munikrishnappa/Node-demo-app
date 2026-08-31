// In-memory dummy "users" data store.
// NOTE: user id 3 intentionally omits the `profile` field to trigger a
// Null Pointer style bug in services/userService.js.
let users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', profile: { address: 'New York, USA' } },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', profile: { address: 'London, UK' } },
  { id: 3, name: 'Carla Diaz', email: 'carla@example.com' }, // BUG SOURCE: missing `profile`
  { id: 4, name: 'David Lee', email: 'david@example.com', profile: { address: 'Singapore' } }
];

function getAll() {
  return users;
}

function getById(id) {
  return users.find((u) => u.id === id);
}

function add(user) {
  users.push(user);
  return user;
}

function nextId() {
  return users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
}

module.exports = { getAll, getById, add, nextId };
