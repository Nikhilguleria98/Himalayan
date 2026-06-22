import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../../lib/api";

const getStoredToken = () => {
  try {
    return JSON.parse(sessionStorage.getItem("token"));
  } catch {
    return null;
  }
};

const getAdminAuthConfig = () => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getStoredToken()}`,
  },
});

const initialState = {
  isLoading: false,
  isUpdating: false,
  orderList: [],
  userList: [],
  error: null,
};

export const getAllOrdersForAdmin = createAsyncThunk(
  "adminOrder/getAllOrdersForAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/admin/order/get`,
        getAdminAuthConfig()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to fetch admin orders"
      );
    }
  }
);

export const getAllUsersWithBookingsForAdmin = createAsyncThunk(
  "adminOrder/getAllUsersWithBookingsForAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/admin/order/users`,
        getAdminAuthConfig()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to fetch admin users"
      );
    }
  }
);

export const approveBookingForAdmin = createAsyncThunk(
  "adminOrder/approveBookingForAdmin",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/admin/order/update/${id}`,
        { orderStatus: "Confirmed" },
        getAdminAuthConfig()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to approve booking"
      );
    }
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload?.data || [];
      })
      .addCase(getAllOrdersForAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.orderList = [];
        state.error = action.payload;
      })
      .addCase(getAllUsersWithBookingsForAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllUsersWithBookingsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userList = action.payload?.data || [];
      })
      .addCase(getAllUsersWithBookingsForAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.userList = [];
        state.error = action.payload;
      })
      .addCase(approveBookingForAdmin.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(approveBookingForAdmin.fulfilled, (state, action) => {
        state.isUpdating = false;
        const updatedOrder = action.payload?.data;
        if (!updatedOrder?._id) return;

        state.userList = state.userList.map((user) => ({
          ...user,
          orders: (user.orders || []).map((order) =>
            order._id === updatedOrder._id
              ? { ...order, orderStatus: updatedOrder.orderStatus }
              : order
          ),
        }));
      })
      .addCase(approveBookingForAdmin.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload;
      });
  },
});

export default adminOrderSlice.reducer;
