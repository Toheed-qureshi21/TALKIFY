import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../slices/formSlice.js";
import authReducer from "../slices/authSlice.js";
import chatReducer from "../slices/chatSlice.js";
export const store = configureStore({
    reducer: {
        form: formReducer,
        auth: authReducer,
        chat: chatReducer,
    },
})


