import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts } from "src/services";

export const getProductsData = createAsyncThunk(
  "api/getProductsData",
  async () => {
    return await getProducts();
  }
);
