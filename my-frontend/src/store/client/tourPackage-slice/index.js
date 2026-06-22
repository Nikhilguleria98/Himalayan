import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../../lib/api";

const initialState = {
  isLoading: false,
  packageList: [],
  error: null, // ✅ added error to initial state
};

// ✅ Async thunk for fetching packages
export const fetchAllPackages = createAsyncThunk(
  "package/fetchAllPackages",
  async (_, { rejectWithValue }) => {
    try {
      const result = await axios.get(
        `${API_BASE_URL}/api/client/package/get`
      );
      return result?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch packages"
      );
    }
  }
);

// ✅ Slice for client packages
const clientPackageSlice = createSlice({
  name: "clientPackages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPackages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllPackages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.packageList = action.payload?.data || [];
        state.error = null;
      })
      .addCase(fetchAllPackages.rejected, (state, action) => {
        state.isLoading = false;
        state.packageList = [];
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default clientPackageSlice.reducer;
