import express from "express";
import cors from "cors";

// Import Routes
import userRoutes from "./routes/user.routes.js";
import articleSummarizerRoutes from "./routes/articleSummarizer.routes.js";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API Version (default: v1)
const API_VERSION = process.env.API_VERSION || "/api/v1";

// Routes
app.use(`${API_VERSION}/auth`, authRoutes);
app.use(`${API_VERSION}/users`, userRoutes);
app.use(`${API_VERSION}/profile`, profileRoutes);
app.use(`${API_VERSION}/article-summarizers`, articleSummarizerRoutes);

// Health Check (optional)
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: `API is running on version ${API_VERSION}`,
  });
});

export default app;
