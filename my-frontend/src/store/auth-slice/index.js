import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../lib/api";

const getStoredToken = () => {
  try {
    return JSON.parse(sessionStorage.getItem("token"));
  } catch {
    return null;
  }
};

const storedToken = getStoredToken();

const initialState = {
  isAuthenticated: Boolean(storedToken),
  isLoading: Boolean(storedToken),
  user: null,
  token: storedToken, // for live token
};

// Async thunk in redux

// Register user async thunk
export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/register`,
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          success: false,
          message: error.message || "Registration failed",
        }
      );
    }
  }
);

// Login user async thunk
export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          success: false,
          message: error.message || "Login failed",
        }
      );
    }
  }
);

export const loginAdmin = createAsyncThunk(
  "auth/adminLogin",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/admin-login`,
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          success: false,
          message: error.message || "Admin login failed",
        }
      );
    }
  }
);

// Logout user async thunk
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  const response = await axios.post(
    `${API_BASE_URL}/api/auth/logout`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
});

// checkAuth user async thunk  for live token
export const checkAuth = createAsyncThunk("auth/checkauth", async (token, { rejectWithValue }) => { 
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/auth/check-auth`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || "Auth failed");
  }
});

// Explanation file k end mein hai
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: () => {},
    resetTokenAndCredentials : (state) => {
      // for live token
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      sessionStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // register user ke extra reducers
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // login user ke extra reducers
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
        state.token = action.payload.token; // for live token
        sessionStorage.setItem("token", JSON.stringify(action.payload.token)); // for live token
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.token = null; // for live token
        sessionStorage.removeItem("token");
      })
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
        state.token = action.payload.token;
        sessionStorage.setItem("token", JSON.stringify(action.payload.token));
      })
      .addCase(loginAdmin.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.token = null;
        sessionStorage.removeItem("token");
      })

      // logout user ke extra reducers
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.token = null;
        sessionStorage.removeItem("token");
      })

      // checkAuth user ke extra reducers
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
        state.token = action.meta.arg;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.token = null;
        sessionStorage.removeItem("token");
      });
  },
});

export const { setUser, resetTokenAndCredentials } = authSlice.actions; // for live token

export default authSlice.reducer;
