// backend/src/routes/articleSummarizer.routes.js
import { Router } from "express";
import {
  createArticleSummarizer,
  getAllArticleSummarizers,
  getArticleSummarizerById,
  updateArticleSummarizer,
  deleteArticleSummarizer,
} from "../controllers/articleSummarizer.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// List all summaries (user must be logged in)
router.get("/", authMiddleware, getAllArticleSummarizers);

// Get one summary
router.get("/:id", authMiddleware, getArticleSummarizerById);

// Create summary (either articleUrl or articleText)
router.post("/", authMiddleware, createArticleSummarizer);

// Update existing summary
router.put("/:id", authMiddleware, updateArticleSummarizer);

// Delete summary
router.delete("/:id", authMiddleware, deleteArticleSummarizer);

export default router;
