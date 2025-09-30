// src/store/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  auth: {
    user: { uid: string; email: string | null } | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  };
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, // { uid, email } or null
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.status = "succeeded";
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    },
  },
});

export const { setUser, clearUser, setError } = authSlice.actions;
export const selectUser = (state: AuthState) => state.auth.user;
export default authSlice.reducer;
