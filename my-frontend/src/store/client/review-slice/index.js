import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../../lib/api";

const initialState = {
  isLoading: false,
  isSubmitting: false,
  reviews: [],
  error: null,
  submitError: null,
  submitSuccess: false,
};

// ── Fetch reviews for a package ────────────────────────────────────────────────
// GET /api/client/review/:tourPackageId
export const fetchPackageReviews = createAsyncThunk(
  "clientReview/fetchReviews",
  async (tourPackageId, { rejectWithValue }) => {
    try {
      const result = await axios.get(
        `${API_BASE_URL}/api/client/review/${tourPackageId}`
      );
      return result.data?.data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch reviews"
      );
    }
  }
);

// ── Submit a review ────────────────────────────────────────────────────────────
// POST /api/client/review/add
// Body: { tourPackageId, userId, userName, reviewMessage, reviewValue }
export const addPackageReview = createAsyncThunk(
  "clientReview/addReview",
  async ({ tourPackageId, userId, userName, reviewMessage, reviewValue }, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        `${API_BASE_URL}/api/client/review/add`,
        { tourPackageId, userId, userName, reviewMessage, reviewValue }
      );
      return result.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to submit review"
      );
    }
  }
);

const clientReviewSlice = createSlice({
  name: "clientReview",
  initialState,
  reducers: {
    clearReviewState: (state) => {
      state.reviews = [];
      state.error = null;
      state.submitError = null;
      state.submitSuccess = false;
    },
    clearSubmitState: (state) => {
      state.submitError = null;
      state.submitSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // Fetch reviews
    builder
      .addCase(fetchPackageReviews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPackageReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload;
        state.error = null;
      })
      .addCase(fetchPackageReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.reviews = [];
        state.error = action.payload || "Failed to load reviews";
      });

    // Add review
    builder
      .addCase(addPackageReview.pending, (state) => {
        state.isSubmitting = true;
        state.submitError = null;
        state.submitSuccess = false;
      })
      .addCase(addPackageReview.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.submitSuccess = true;
        state.submitError = null;
        // Append the new review to the list optimistically
        if (action.payload?.data) {
          state.reviews = [...state.reviews, action.payload.data];
        }
      })
      .addCase(addPackageReview.rejected, (state, action) => {
        state.isSubmitting = false;
        state.submitSuccess = false;
        state.submitError = action.payload || "Failed to submit review";
      });
  },
});

export const { clearReviewState, clearSubmitState } = clientReviewSlice.actions;
export default clientReviewSlice.reducer;
