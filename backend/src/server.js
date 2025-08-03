import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { CONNECTDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routers/authRoute.js";
import productRoutes from "./routers/productRoute.js";
import cartRoutes from "./routers/cartRoutes.js";
import couponRoutes from "./routers/couponRoutes.js";
import paymentRoutes from "./routers/paymentRoutes.js";
import analyticsRoutes from "./routers/analyticsRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
      methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
      allowedHeaders: "Content-Type, Authorization",
      credentials: true,
    })
  );
}

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);

CONNECTDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server has started on Port: ${PORT}`);
  });
});
