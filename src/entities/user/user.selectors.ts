import {UserState} from "./user.types.ts";

export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectRole = (state: { user: UserState }) => state.user.user?.role;