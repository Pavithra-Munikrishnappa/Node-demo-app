const divideService = require('../services/divideService');

// GET /api/divide?a=10&b=2
function divide(req, res) {
  const a = Number(req.query.a);
  const b = Number(req.query.b);
  const result = divideService.divide(a, b);
  res.json({ a, b, result });
}

module.exports = { divide };
