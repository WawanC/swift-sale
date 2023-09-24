import { Product } from "../types/product.ts";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProductsApi } from "../api/product.ts";

export interface ProductsState {
  products: Product[];
  isFetching: boolean;
}

const initialState: ProductsState = {
  products: [],
  isFetching: false,
};

export const fetchProductsThunk = createAsyncThunk(
  "product/fetch",
  async (filter: { search?: string } | undefined) => {
    return await getProductsApi({ search: filter?.search });
  },
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductsLoading: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsThunk.fulfilled, (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProductsThunk.pending, (state, _) => {
      state.isFetching = true;
    });
    builder.addCase(fetchProductsThunk.rejected, (state, _) => {
      state.isFetching = false;
    });
  },
});

export const { setProductsLoading } = productsSlice.actions;

export default productsSlice.reducer;
