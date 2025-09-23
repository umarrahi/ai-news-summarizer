import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import articleSummarizerRoutes from "./routes/articleSummarizer.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/article-summarizers", articleSummarizerRoutes);

export default app;
