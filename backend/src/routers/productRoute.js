import express from "express";
import {
  getAllProducts,
  getFeaturedProducts,
  getProductByCategory,
  addProduct,
  getRecommendedProducts,
  toggleFeaturedProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { adminRoute, protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductByCategory);
router.get('/recommendations', getRecommendedProducts)
router.post("/addProduct", protectRoute, adminRoute, addProduct);
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);

export default router;
