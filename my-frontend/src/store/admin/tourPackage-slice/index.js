import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../../lib/api";

const initialState = {
  isAuthenticated : false,
  isLoading: false,
  packageList: [],
};

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

export const addNewPackage = createAsyncThunk(
  "package/addnewpackage",
  async (formData) => {
    console.log(formData,"slice aata")
    const result = await axios.post(
      `${API_BASE_URL}/api/admin/package/add`,
      formData,
      getAdminAuthConfig()
    );

    return result?.data;
  }
);

export const fetchAllPackages = createAsyncThunk(
  "package/fetchAllPackages",
  async () => {
    const result = await axios.get(
      `${API_BASE_URL}/api/admin/package/get`
    );

    return result?.data;
  }
);

export const editPackage = createAsyncThunk(
  "package/editPackage",
  async ({ id, formData }) => {
    const result = await axios.put(
      `${API_BASE_URL}/api/admin/package/edit/${id}`,
      formData,
      getAdminAuthConfig()
    );
    return result?.data;
  }
);

export const deletePackage = createAsyncThunk(
  "package/deletePackage",
  async (id) => {
    const result = await axios.delete(
      `${API_BASE_URL}/api/admin/package/delete/${id}`,
      getAdminAuthConfig()
    );

    return result?.data;
  }
);

const AdminPackagesSlice = createSlice({
  name: "adminPackages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPackages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllPackages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.packageList = action.payload.data;
      })
      .addCase(fetchAllPackages.rejected, (state) => {
        state.isLoading = false;
        state.packageList = [];
      });
  },
});

export default AdminPackagesSlice.reducer;
