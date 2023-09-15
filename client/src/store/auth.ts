import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMeApi } from "../api/auth.ts";

export interface AuthState {
  data: {
    userId: string | null;
    username: string | null;
    email: string | null;
  };
  isFetching: boolean;
}

const initialState: AuthState = {
  data: {
    userId: null,
    username: null,
    email: null,
  },
  isFetching: false,
};

export const fetchAuthThunk = createAsyncThunk("auth/fetch", async () => {
  return await getMeApi();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthReducer: (state) => {
      state.data = {
        userId: null,
        email: null,
        username: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuthThunk.fulfilled, (state, action) => {
      state.isFetching = false;
      state.data = {
        userId: action.payload.id,
        email: action.payload.email,
        username: action.payload.username,
      };
    });
    builder.addCase(fetchAuthThunk.pending, (state, _) => {
      state.isFetching = true;
    });
    builder.addCase(fetchAuthThunk.rejected, (state, _) => {
      state.isFetching = false;
      state.data = {
        userId: null,
        email: null,
        username: null,
      };
    });
  },
});

export const { clearAuthReducer } = authSlice.actions;

export default authSlice.reducer;
