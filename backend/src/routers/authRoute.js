import express from "express";
import {
  signupHandler,
  loginHandler,
  logOutHandler,
  refreshToken,
  getProfile,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signupHandler);
router.post("/login", loginHandler);
router.post("/logout", logOutHandler);
router.post("/refresh-token", refreshToken);
router.get("/profile", getProfile);

export default router;
