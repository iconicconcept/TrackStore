import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
import TrendingProducts from "../components/TrendingProducts";
import GiftCouponCard from "../components/GiftCouponCard";

const Cart = () => {
  const { cart } = useCartStore();

  return (
    <div className="py-8 md:py-16 md:px-3">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <motion.div
            className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {cart.length === 0 ? (
              <EmptyCartUI />
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}

                {/* Show summary & coupon on mobile above trending */}
                <div className="block lg:hidden space-y-6">
                  <OrderSummary />
                  <GiftCouponCard />
                </div>

                {/* Trending products always below on mobile */}
                {cart.length > 0 && <TrendingProducts /> }
              </div>
            )}
          </motion.div>

          {/* Right column on large screens */}
          {cart.length > 0 && (
            <motion.div
              className="hidden lg:block mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <OrderSummary />
              <GiftCouponCard />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Cart;

const EmptyCartUI = () => (
  <motion.div
    className="flex flex-col items-center justify-center space-y-4 py-16"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <ShoppingCart className="h-22 w-22 text-gray-300" />
    <h3 className="text-[16px] font-semibold ">Your cart is empty</h3>
    <p className="text-gray-400">
      Looks like you {"haven't"} added anything to your cart yet.
    </p>
    <Link
      className="mt-4 rounded-md bg-emerald-500 px-5 py-2 text-white transition-colors hover:bg-emerald-600"
      to="/"
    >
      Add a Product
    </Link>
  </motion.div>
);
