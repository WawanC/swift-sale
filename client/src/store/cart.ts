import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  items: string[];
  count: number;
}

const initialState: CartState = {
  items: [],
  count: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<string>) => {
      state.items.push(action.payload);
      state.count++;
    },
  },
});

export const { addCart } = cartSlice.actions;

export default cartSlice.reducer;
