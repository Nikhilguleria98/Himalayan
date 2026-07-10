import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../../lib/api";

const initialState = {
  isLoading: false,
  packageList: [],
  packageDetails: null,
  error: null,
};

// ── Fetch all packages (no filters – used for discoverTrips + client-side filter) ──
// GET /api/client/package/get
export const fetchAllPackages = createAsyncThunk(
  "package/fetchAllPackages",
  async (_, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${API_BASE_URL}/api/client/package/get`);
      return result?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch packages"
      );
    }
  }
);

// ── Fetch packages filtered by category on the backend ──
// GET /api/client/package/get?category=<cat>
export const fetchPackagesByCategory = createAsyncThunk(
  "package/fetchByCategory",
  async (category, { rejectWithValue }) => {
    try {
      const params = category && category !== "All" ? { category } : {};
      const result = await axios.get(`${API_BASE_URL}/api/client/package/get`, { params });
      return result?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch packages"
      );
    }
  }
);

// ── Fetch single package details ──
// GET /api/client/package/get/:id
export const fetchPackageDetails = createAsyncThunk(
  "package/fetchDetails",
  async (id, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${API_BASE_URL}/api/client/package/get/${id}`);
      return result?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Package not found"
      );
    }
  }
);

// ── Slice ──────────────────────────────────────────────────────────────────────
const clientPackageSlice = createSlice({
  name: "clientPackages",
  initialState,
  reducers: {
    clearPackageDetails: (state) => {
      state.packageDetails = null;
    },
  },
  extraReducers: (builder) => {
    // fetchAllPackages
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

    // fetchPackagesByCategory (shares the same packageList state)
    builder
      .addCase(fetchPackagesByCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPackagesByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.packageList = action.payload?.data || [];
        state.error = null;
      })
      .addCase(fetchPackagesByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.packageList = [];
        state.error = action.payload || "Something went wrong";
      });

    // fetchPackageDetails
    builder
      .addCase(fetchPackageDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPackageDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.packageDetails = action.payload?.data || null;
        state.error = null;
      })
      .addCase(fetchPackageDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.packageDetails = null;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { clearPackageDetails } = clientPackageSlice.actions;
export default clientPackageSlice.reducer;
