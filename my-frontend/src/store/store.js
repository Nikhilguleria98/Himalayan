import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminTourPackageSlice from "./admin/tourPackage-slice";
import adminOrderSlice from "./admin/order-slice";

import clientTourPackageSlice from "./client/tourPackage-slice";
import clientOrderSlice from "./client/order-slice";
import clientSearchSlice from "./client/search-slice";
import clientReviewSlice from "./client/review-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,

    adminTourPackages: adminTourPackageSlice,
    adminOrder: adminOrderSlice,

    clientTourPackages: clientTourPackageSlice,
    clientOrder: clientOrderSlice,
    clientSearch: clientSearchSlice,
    clientReview: clientReviewSlice,
  },
});

export default store;
