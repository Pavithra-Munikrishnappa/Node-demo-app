const usersData = require('../data/users');

const FIRST_NAMES = ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason'];
const LAST_NAMES = ['Carter', 'Nguyen', 'Patel', 'Garcia', 'Kim', 'Brown', 'Muller', 'Rossi'];
const CITIES = ['Berlin, Germany', 'Toronto, Canada', 'Sydney, Australia', 'Tokyo, Japan', 'Bangalore, India'];

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function getAllUsers() {
  return usersData.getAll();
}

// BUG: reads `user.profile.address` without checking whether `profile`
// exists. User id 3 has no `profile` field (see data/users.js), so this
// throws: TypeError: Cannot read properties of undefined (reading 'address').
function getUserById(id) {
  const user = usersData.getById(id);
  if (!user) {
    return null;
  }

  const address = user.profile.address; // <-- Null Pointer bug source

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    address
  };
}

// Creates a new user with randomly generated dummy details, used for the
// POST /api/users demo endpoint.
function createRandomUser(overrides = {}) {
  const first = pickRandom(FIRST_NAMES);
  const last = pickRandom(LAST_NAMES);
  const name = overrides.name || `${first} ${last}`;
  const email = overrides.email || `${first}.${last}`.toLowerCase() + '@example.com';
  const address = overrides.address || pickRandom(CITIES);

  const newUser = {
    id: usersData.nextId(),
    name,
    email,
    profile: { address }
  };

  return usersData.add(newUser);
}

module.exports = { getAllUsers, getUserById, createRandomUser };
