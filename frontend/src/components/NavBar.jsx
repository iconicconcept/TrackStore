import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const NavBar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const navigate = useNavigate();
  const { cart } = useCartStore();

  const handleLogOut = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header
      className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40
    transition-all duration-300 border-b border-emerald-800"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between flex-wrap gap-2 md:gap-0">
          <Link
            to="/"
            className="text-2xl font-bold text-emerald-400 items-center space-x-2 flex cursor-pointer"
          >
            TRACKSTORE
          </Link>

          <nav className="flex flex-wrap items-center gap-4">
            <Link
              to="/"
              className="text-gray-300 hover:text-emerald-400 cursor-pointer transition duration-300 ease-in-out"
            >
              Home
            </Link>
            {user && (
              <Link
                to={"/cart"}
                className="relative group text-gray-300 cursor-pointer hover:text-emerald-400 transition duration-300 ease-in-out"
              >
                <ShoppingCart
                  className="inline-block mr-1 group-hover:text-emerald-400 transition duration-300 ease-in-out"
                  size={17}
                />
                <span>Cart</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-1.5 py-0.5 text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out">
                    {cart.length}
                  </span>
                )}
              </Link>
            )}

            {isAdmin && (
              <Link
                to={"/admin-dashboard"}
                className="bg-emerald-700 hover:bg-emerald-600 cursor-pointer text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
              >
                <Lock className="inline-block mr-1" size={17} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}

            {user ? (
              <button
                className="bg-gray-700 hover:bg-gray-600 cursor-pointer text-white py-1 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
                onClick={handleLogOut}
              >
                <LogOut className="inline-block" size={17} />
                <span className="hidden sm:inline ml-1">Log Out</span>
              </button>
            ) : (
              <>
                <Link
                  to={"/signup"}
                  className="bg-emerald-700 hover:bg-emerald-600 text-white py-1 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <UserPlus className="mr-1" size={17} />
                  SignUp
                </Link>
                <Link
                  to={"/login"}
                  className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <LogIn className="mr-1" size={17} />
                  LogIn
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
