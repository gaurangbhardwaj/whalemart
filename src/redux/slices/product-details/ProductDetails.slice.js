import { createSlice } from "@reduxjs/toolkit";

import { getProductDetailsData } from "./ProductDetails.thunk";

const productDetailsSlice = createSlice({
  name: "productDetail",
  initialState: {
    loading: false,
    data: {},
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetailsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductDetailsData.fulfilled, (state, action) => {
        if (!action.payload?.id) return;
        state.loading = false;
        state.data[action.payload?.id] = action.payload;
      })
      .addCase(getProductDetailsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export default productDetailsSlice.reducer;
