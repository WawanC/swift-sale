import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CartItem } from "../types/cart.ts";
import { getCartsApi } from "../api/cart.ts";

export interface CartState {
  items: CartItem[];
  isFetching: boolean;
}

const initialState: CartState = {
  items: [],
  isFetching: false,
};

export const fetchCartsThunk = createAsyncThunk("carts/fetch", async () => {
  return await getCartsApi();
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCartsThunk.fulfilled, (state, action) => {
      state.isFetching = false;
      state.items = action.payload;
    });
    builder.addCase(fetchCartsThunk.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(fetchCartsThunk.rejected, (state) => {
      state.isFetching = false;
    });
  },
});

export const {} = cartSlice.actions;

export default cartSlice.reducer;
