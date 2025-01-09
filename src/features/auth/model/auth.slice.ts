import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login } from "@/features/auth/auth.actions.ts";
import {handleGetMeFulfilled, handleLoginFulfilled, handleLoginPending} from './auth-handler';
import {getMe} from "@/entities/user/user.actions.ts";

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error?: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkAuthStatus(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, handleLoginPending)
      .addCase(login.fulfilled, handleLoginFulfilled)
      .addCase(login.rejected, (state, action: PayloadAction<string | unknown>) => {
        state.loading = false;
        state.error = action.payload as string; // Здесь мы используем type assertion
      })
      .addCase(getMe.fulfilled, handleGetMeFulfilled)

  },
});

export const { setAuth,checkAuthStatus, setLoading } = authSlice.actions;
export const authReducer = authSlice.reducer;
export type { AuthState };
