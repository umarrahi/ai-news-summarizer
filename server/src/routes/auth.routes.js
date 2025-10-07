// server/src/routes/auth.routes.js
import { Router } from "express";
import { register, login, getMe, authMiddleware, verifyEmail } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, getMe);
router.get("/verify-email/:token", verifyEmail);

export default router;

