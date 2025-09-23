import { Router } from "express";
import {
  createArticleSummarizer,
  getAllArticleSummarizers,
  getArticleSummarizerById,
  updateArticleSummarizer,
  deleteArticleSummarizer,
} from "../controllers/articleSummarizer.controller.js";
import { authMiddleware } from "../controllers/auth.controller.js";

const router = Router();

// Public: view all or one
router.get("/", authMiddleware, getAllArticleSummarizers);
router.get("/:id", authMiddleware, getArticleSummarizerById);

// Protected: create, update, delete
router.post("/", authMiddleware, createArticleSummarizer);
router.put("/:id", authMiddleware, updateArticleSummarizer);
router.delete("/:id", authMiddleware, deleteArticleSummarizer);

export default router;
    