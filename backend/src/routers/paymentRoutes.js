import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { createCheckOutSession, checkCheckoutSuccess } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-checkout-session", protectRoute, createCheckOutSession);
router.post("/checkout-success", checkCheckoutSuccess)

export default router;
