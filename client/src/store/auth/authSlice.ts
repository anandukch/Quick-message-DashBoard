import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
    token: string | null;
    isAuthenticated: boolean;
};
const initialState: AuthState = {
    token: JSON.parse(localStorage.getItem("auth")!)?.token || null,
    isAuthenticated:
        JSON.parse(localStorage.getItem("auth")!)?.isAuthenticated || false,
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<AuthState>) => {
            localStorage.setItem(
                "auth",
                JSON.stringify({
                    ...state,
                    token: action.payload.token,
                    isAuthenticated: true,
                })
            );
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
            };
        },
        logOut: (state) => {
            localStorage.removeItem("auth");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
            };
        },
    },
});

export const { login, logOut } = authSlice.actions;

export default authSlice.reducer;
