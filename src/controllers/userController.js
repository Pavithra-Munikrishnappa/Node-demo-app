const userService = require('../services/userService');

// GET /api/users
function listUsers(req, res) {
  res.json(userService.getAllUsers());
}

// GET /api/users/:id
function getUser(req, res) {
  const id = Number(req.params.id);
  const user = userService.getUserById(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
}

// POST /api/users
// Body (all optional): { "name": "...", "email": "...", "address": "..." }
// Any field left out is filled in with random dummy data.
function createUser(req, res) {
  const { name, email, address } = req.body || {};
  const user = userService.createRandomUser({ name, email, address });
  res.status(201).json(user);
}

module.exports = { listUsers, getUser, createUser };
