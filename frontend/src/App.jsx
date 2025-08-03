import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Cart from "./pages/Cart";
import { useUserStore } from "./stores/useUserStore";
import Loading from "./components/Loading";
import AdminDashboard from "./pages/Dashboard";
import CategoryPage from "./pages/CategoryPage";
import { useCartStore } from "./stores/useCartStore";
import PurchaseSuccess from "./pages/PurchaseSuccess";
import PurchaseCancel from "./pages/PurchaseCancel";

const App = () => {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!user) return;

    getCartItems();
  }, [getCartItems, user]);

  // If checkingAuth is true, show the loading spinner
  if (checkingAuth) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* bg-gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]" />
        </div>
      </div>

      <div className="relative z-50 pt-20">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/signup"
            element={!user ? <SignUp /> : <Navigate to="/" />}
          />

          <Route
            path="/login"
            element={!user ? <LogIn /> : <Navigate to="/" />}
          />

          <Route
            path="/admin-dashboard"
            element={
              user?.role === "admin" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route path="/category/:category" element={<CategoryPage />} />

          <Route
            path="/cart"
            element={user ? <Cart /> : <Navigate to="/login" />}
          />

          <Route
            path="/purchase-success"
            element={user ? <PurchaseSuccess /> : <Navigate to="/login" />}
          />

          <Route
            path="/purchase-cancel"
            element={user ? <PurchaseCancel /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
