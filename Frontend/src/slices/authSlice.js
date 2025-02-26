    import { createSlice } from "@reduxjs/toolkit";

    const initialState = {
        user: null,
        loading: false,
        error: null,
        onlineUsers: [],
    };

    const authSlice = createSlice({
        name: "auth",
        initialState,
        reducers: {
            authStart: (state) => {
                state.loading = true;
            },
            authSuccess: (state, action) => {
                state.loading = false;
                state.user = action.payload;
            },
            authFailure: (state, action) => {
                state.loading = false;
                state.error = action.payload;
            },
            resetAuth: (state) => {
                state.user = null;
                state.loading = false;
                state.error = null;
            },
            setOnlineUsers: (state, action) => {
                state.onlineUsers = action.payload;
                console.log("Updated online users:", state.onlineUsers);
            },
        },
    });

    export const { authStart, authSuccess, authFailure, resetAuth, setOnlineUsers, setSocket } = authSlice.actions;
    export default authSlice.reducer;
