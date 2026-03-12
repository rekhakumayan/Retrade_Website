const { connect, connection } = require('mongoose');

class Database {
  static async connectDB() {
    try {
      await connect(process.env.DB_URL);
      console.log('Db connected');
      return true;
    } catch (err) {
      console.error('Database connection failed:', err.message);
      throw err;
    }
  }

  static async disconnect() {
    try {
      await connection.close();
    } catch (err) {
      console.error('Database disconnect failed:', err.message);
      throw err;
    }
  }
}

module.exports = Database;
