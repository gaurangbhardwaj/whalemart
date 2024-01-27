import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductDetails } from "src/services";

export const getProductDetailsData = createAsyncThunk(
  "api/getProductDetailsData",
  async (id) => {
    return await getProductDetails(id);
  }
);

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

export const selectProductDetailsData = (state) => state.productDetails.data;
export const selectProductDetailsLoading = (state) =>
  state.productDetails.loading;
export const selectProductDetailsError = (state) => state.productDetails.error;

export default productDetailsSlice.reducer;
