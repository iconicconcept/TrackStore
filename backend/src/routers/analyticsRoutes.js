import express from "express";
import { adminRoute, protectRoute } from "../middleware/authMiddleware.js";
import {
  getAnalyticsData,
  getDailySalesData,
} from "../controllers/analyticsController.js";

const router = express.Router();

router.post("/", protectRoute, adminRoute, async (req, res) => {
  try {
    const analyticsData = await getAnalyticsData();

    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    const dailySalesData = await getDailySalesData(startDate, endDate);

    res.json({
      analyticsData,
      dailySalesData,
    });
  } catch (error) {
    console.error("Error in getting the analytics", err.message);
    res.status(401).json({ message: "Internal server error" });
  }
});

export default router;
