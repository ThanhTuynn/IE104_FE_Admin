import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Initial state
const initialState = {
  admin_name: "",
  admin_email: "",
  is_admin: false, // Assuming this is a boolean value
  _id: "",
  accessToken: localStorage.getItem("accessToken") || "",
  refreshToken: Cookies.get("refreshToken") || "",
  isAuthenticated: !!localStorage.getItem("accessToken"), // Check if accessToken exists
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    updateAdmin: (state, action) => {
      // Payload destructuring for clarity
      const {
        admin_name = "",
        admin_email = "",
        is_admin = false,
        _id = "",
        accessToken = "",
        refreshToken = "",
      } = action.payload || {};

      // Update state with payload data
      return {
        ...state,
        admin_name,
        admin_email,
        is_admin,
        _id,
        accessToken,
        refreshToken,
        isAuthenticated: true, // Ensure user is authenticated
      };
    },
    resetAdmin: () => {
      // Reset state to initial values
      return {
        ...initialState,
        accessToken: "", // Ensure tokens are cleared
        refreshToken: "",
        isAuthenticated: false,
      };
    },
    logout: () => {
      // Remove cookies and localStorage tokens
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      return {
        ...initialState,
        accessToken: "", // Ensure tokens are cleared
        refreshToken: "",
        isAuthenticated: false,
      };
    },
  },
});

export const { updateAdmin, resetAdmin, logout } = adminSlice.actions;
export default adminSlice.reducer;
