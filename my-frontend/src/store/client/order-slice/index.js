import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../../lib/api";

const initialState = {
  isLoading: false,
  orderList: [],
  orderDetails: null,
  error: null,
};

export const getAllOrdersByUser = createAsyncThunk(
  "clientOrders/getAllByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/client/orders/user/${userId}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          success: false,
          message: error.message || "Unable to fetch bookings",
        }
      );
    }
  }
);

export const getOrderDetails = createAsyncThunk(
  "clientOrders/getDetails",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/client/orders/${orderId}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          success: false,
          message: error.message || "Unable to fetch booking details",
        }
      );
    }
  }
);

const clientOrderSlice = createSlice({
  name: "clientOrders",
  initialState,
  reducers: {
    clearOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersByUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllOrdersByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload?.success ? action.payload.data || [] : [];
        state.error = null;
      })
      .addCase(getAllOrdersByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.orderList = [];
        state.error =
          action.payload?.message ||
          action.payload?.error ||
          "Unable to fetch bookings";
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload?.success ? action.payload.data : null;
        state.error = null;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.orderDetails = null;
        state.error =
          action.payload?.message ||
          action.payload?.error ||
          "Unable to fetch booking details";
      });
  },
});

export const { clearOrderDetails } = clientOrderSlice.actions;

export default clientOrderSlice.reducer;
