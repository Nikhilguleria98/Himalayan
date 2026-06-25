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
  selectedUser: null,
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

export const getUserDetailForAdmin = createAsyncThunk(
  "adminOrder/getUserDetailForAdmin",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/admin/order/users/${userId}`,
        getAdminAuthConfig()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to fetch user detail"
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

        // Update in userList
        state.userList = state.userList.map((user) => ({
          ...user,
          orders: (user.orders || []).map((order) =>
            order._id === updatedOrder._id
              ? { ...order, orderStatus: updatedOrder.orderStatus }
              : order
          ),
        }));

        // Update in selectedUser if open
        if (state.selectedUser) {
          state.selectedUser = {
            ...state.selectedUser,
            orders: (state.selectedUser.orders || []).map((order) =>
              order._id === updatedOrder._id
                ? { ...order, orderStatus: updatedOrder.orderStatus }
                : order
            ),
          };
        }
      })
      .addCase(approveBookingForAdmin.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload;
      })
      .addCase(getUserDetailForAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.selectedUser = null;
      })
      .addCase(getUserDetailForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedUser = action.payload?.data || null;
      })
      .addCase(getUserDetailForAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.selectedUser = null;
        state.error = action.payload;
      });
  },
});

export default adminOrderSlice.reducer;
