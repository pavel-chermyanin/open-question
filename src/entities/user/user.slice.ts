import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User, UserState} from "./user.types.ts";
import {getMe} from "@/entities/user/user.actions.ts";


const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMe.fulfilled, (state,action) => {
        state.user = action.payload
      })
      // .addCase(login.pending, )

  },
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;