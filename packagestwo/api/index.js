const { start, init } = require('./src/server/index');

(async function () {
  try {
    await init();
    await start();
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();

