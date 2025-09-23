import http from "http";
import dotenv from "dotenv";
import sequelize from "./src/config/db.js";
import app from "./src/app.js";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Test DB connection + start server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    await sequelize.sync(); // ✅ update tables if schema changes
    console.log("✅ Tables synced");

    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error);
  }
};

startServer();
