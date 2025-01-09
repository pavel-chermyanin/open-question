import {AuthState} from "./auth.slice.ts";

export const selectAuth = (state: { auth: AuthState }) => state.auth.isAuthenticated;