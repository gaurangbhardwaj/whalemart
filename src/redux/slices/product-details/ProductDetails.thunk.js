import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProductDetails } from "src/services";

export const getProductDetailsData = createAsyncThunk(
  "api/getProductDetailsData",
  async (id) => {
    return await getProductDetails(id);
  }
);
