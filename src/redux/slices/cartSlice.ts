import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  wishlist: string[]; // Course IDs
  cart: string[];     // Course IDs
}

const initialState: CartState = {
  wishlist: ['course-ai-data-science-python'],
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<string>) => {
      const courseId = action.payload;
      const index = state.wishlist.indexOf(courseId);
      if (index >= 0) {
        state.wishlist.splice(index, 1);
      } else {
        state.wishlist.push(courseId);
      }
    },
    addToCart: (state, action: PayloadAction<string>) => {
      if (!state.cart.includes(action.payload)) {
        state.cart.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(id => id !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { toggleWishlist, addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
