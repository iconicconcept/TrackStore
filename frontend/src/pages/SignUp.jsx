import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  ArrowRight,
  Loader,
  LucideEye,
  LucideEyeOff,
} from "lucide-react";
import { motion } from "framer-motion";
import Input from "../components/Input";
import { useUserStore } from "../stores/useUserStore";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const {signup, loading} =useUserStore()

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData)
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswords = () => {
    setShowPasswords(!showPasswords);
  };

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mt-4 text-center text-3xl font-extrabold text-emerald-400">
          Create Your Account
        </h2>
      </motion.div>

      <motion.div
        className=" mt-6 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className=" bg-gray-800 py-8 px-4 sm:rounded-lg shadow sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <Input
              type="text"
              id="fullName"
              icon={
                <User className="h-4 w-4 text-gray-400" aria-hidden="true" />
              }
              value={formData.fullName}
              label={"Full Name"}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              placeholder="Micheal Jackson"
            />

            {/* Email Input */}
            <Input
              htmlFor="email"
              label="Email Address"
              type="text"
              id="email"
              icon={
                <Mail className="h-4 w-4 text-gray-400" aria-hidden="true" />
              }
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="michjack@gmail.com"
            />

            {/* password Input */}
            <div className="relative">
              <Input
                htmlFor="password"
                label="Password"
                type={showPasswords ? "text" : "password"}
                id="password"
                icon={
                  <Lock className="h-4 w-4 text-gray-400" aria-hidden="true" />
                }
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Not less than 6 character"
              />

              {showPasswords ? (
                <LucideEye
                  className="absolute right-3 top-8 cursor-pointer h-4 w-4 mt-2 z-50"
                  onClick={togglePasswords}
                />
              ) : (
                <LucideEyeOff
                  className="absolute right-3 top-8 cursor-pointer h-4 w-4 mt-2 z-50"
                  onClick={togglePasswords}
                />
              )}
            </div>

            {/* confirm password Input */}
            <div className="relative">
              <Input
                htmlFor="confirmPassword"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                icon={
                  <Lock className="h-4 w-4 text-gray-400" aria-hidden="true" />
                }
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                placeholder="confirm your your password"
              />

              {showPassword ? (
                <LucideEye
                  className="absolute right-3 top-8 cursor-pointer h-4 w-4 mt-2 z-50"
                  onClick={togglePassword}
                />
              ) : (
                <LucideEyeOff
                  className="absolute right-3 top-8 cursor-pointer h-4 w-4 mt-2 z-50"
                  onClick={togglePassword}
                />
              )}
            </div>

            {/* submit button */}
            <button
              type="submit"
              className="cursor-pointer flex items-center justify-center w-full py-2 px-4 border border-transparent
              rounded-md shadow-sm text-sm font-medium text-white bg-emerald-700 hover:bg-emerald-600 
            focus:border-emerald-500 sm:text-sm transition duration-150 ease-in-out disabled:opacity-50 "
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader
                    className="mr-2 h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                  Loading...
                </>
              ) : (
                <>
                  <UserPlus
                    className="mr-2 h-4 w-4 animate-bounce"
                    aria-hidden="true"
                  />
                  SignUp
                </>
              )}
            </button>
          </form>

          {/* account availability */}
          <p className="mt-7 text-center text-sm text-gray-400">
            Already have an account?{" "} 
            <Link
              to={"/login"}
              className="font-medium text-emerald-400 hover:text-emerald-300"
            >Login here <ArrowRight className="inline h-4 w-4" /></Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
