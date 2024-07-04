import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts } from "src/services";

export const getProductsData = createAsyncThunk(
  "api/getProductsData",
  async () => {
    return await getProducts();
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getProductsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      })
  },
});

export default productSlice.reducer;
