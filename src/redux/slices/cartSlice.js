import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    data: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItem = state.data.find((item) => item.product.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.data.push({ product, quantity });
      }
    },
  },
});

export const selectCartData = (state) => state.cart.data;
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
