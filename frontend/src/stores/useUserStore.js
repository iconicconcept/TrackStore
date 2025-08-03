import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "react-hot-toast";
import axios from "axios";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ fullName, email, password, confirmPassword }) => {
    set({ loading: true });

    if (password !== confirmPassword) {
      toast.error("Passwords not match!");
      set({ loading: false });
      return;
    }

    try {
      const res = await axiosInstance.post("/auth/signup", {
        fullName,
        email,
        password,
      });

      set({
        user: res.data.user || res.data,
        loading: false,
        checkingAuth: false,
      });
      toast.success("Account created successfully!");
    } catch (error) {
      set({ loading: false });
      if (axios.isAxiosError(error)) {
        const axiosError = error;
        if (axiosError.response?.status === 409) {
          toast.error("This email is already registered, Pls Login.");
        } else {
          toast.error("Failed to create account. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  },

  login: async ({ email, password }) => {
    set({ loading: true });

    try {
      const res = await axiosInstance.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );
      toast.success("Logged in successfully!");
      set({ user: res.data, loading: false, checkingAuth: false });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        set({ loading: false });
        const axiosError = error;
        if (axiosError.response?.status === 404) {
          toast.error("Account not found. Please check your email or sign up.");
        } else if (axiosError.response?.status === 401) {
          toast.error("Invalid Email or Password.");
        } else {
          toast.error("Failed to sign in. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await axiosInstance.post("/auth/logout");
      set({ user: null, loading: false });
      toast.success("Logged out successfully!");
    } catch (error) {
      set({ loading: false });
      toast.error("Error logging out");
      console.log(
        error.response?.data?.message || "An error occurred during logout"
      );
    }
  },

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/profile", {
        withCredentials: true,
      });
      set({ user: res.data.user || res.data, checkingAuth: false });
    } catch (error) {
      set({ user: null, checkingAuth: false });
      console.log(error.response?.data?.message || "An error occurred");
    }
  },

  refreshToken: async () => {
    // Prevent multiple simultaneous refresh attempts
    if (get().checkingAuth) return;

    set({ checkingAuth: true });
    try {
      const response = await axiosInstance.post("/auth/refresh-token");
      set({ checkingAuth: false });
      return response.data;
    } catch (error) {
      set({ user: null, checkingAuth: false });
      throw error;
    }
  },
}));

// Axios interceptor for token refresh
let refreshPromise = null;

// implementing axios interceptor for refreshing access token to be gotten every 15m as it has been implemented in backend to be deleted in after every 15m
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // If a refresh is already in progress, wait for it to complete
        if (refreshPromise) {
          await refreshPromise;
          return axiosInstance(originalRequest);
        }

        // Start a new refresh process
        refreshPromise = useUserStore.getState().refreshToken();
        await refreshPromise;
        refreshPromise = null;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login or handle as needed
        useUserStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
