import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../../lib/api";

const initialState = {
  isLoading: false,
  searchResults: [],
  error: null,
  lastKeyword: "",
};

// ── Async thunk: hit the backend search endpoint ──────────────────────────────
// Route: GET /api/client/search/search/:keyword
// Searches across: title, description, pickDrop, duration,
//   placesToVisit, itinerary, howToReach — all via regex on the server
export const searchPackages = createAsyncThunk(
  "clientSearch/searchPackages",
  async (keyword, { rejectWithValue }) => {
    try {
      if (!keyword || !keyword.trim()) {
        return { data: [], keyword: "" };
      }
      const result = await axios.get(
        `${API_BASE_URL}/api/client/search/search/${encodeURIComponent(keyword.trim())}`
      );
      return { data: result.data?.data || [], keyword: keyword.trim() };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Search failed. Please try again."
      );
    }
  }
);

const clientSearchSlice = createSlice({
  name: "clientSearch",
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.lastKeyword = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchPackages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchPackages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload.data;
        state.lastKeyword = action.payload.keyword;
        state.error = null;
      })
      .addCase(searchPackages.rejected, (state, action) => {
        state.isLoading = false;
        state.searchResults = [];
        state.error = action.payload || "Search failed";
      });
  },
});

export const { clearSearchResults } = clientSearchSlice.actions;
export default clientSearchSlice.reducer;
