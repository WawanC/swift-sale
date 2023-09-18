import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../types/cart.ts";

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<CartItem>) => {
      const itemIdx = state.items.findIndex(
        (item) => item.productId === action.payload.productId,
      );
      if (itemIdx >= 0) {
        state.items[itemIdx].count += action.payload.count;
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const { addCart } = cartSlice.actions;

export default cartSlice.reducer;
