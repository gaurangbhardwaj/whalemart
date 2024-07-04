import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItem = state.data.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.data.push({ product, quantity });
      }
    },
    updateQuantity: (state, action) => {
      console.log("action.payload", action.payload)
      const { id, quantity } = action.payload;
      const existingItemIndex = state.data.findIndex(
        (item) => item.product.id === id
      );
      if (!state.data[existingItemIndex]) return;
      if (quantity >= 1) {
        state.data[existingItemIndex].quantity = quantity;
        return;
      }
      state.data.splice(existingItemIndex, 1);
    },
  },
});

export const action = cartSlice.actions;
export default cartSlice.reducer;
