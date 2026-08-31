// BUG: no guard against division by zero. When b === 0, this throws an
// explicit runtime error instead of silently returning Infinity, so the
// failure surfaces clearly in the logs for the self-healing assistant.
function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed'); // <-- bug source
  }
  return a / b;
}

module.exports = { divide };
