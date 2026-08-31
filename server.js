const app = require('./src/app');
const { logInfo } = require('./src/utils/logger');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logInfo(`Application 1 (demo backend) listening on http://localhost:${PORT}`);
});
