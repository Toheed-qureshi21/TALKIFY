import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chats: [],
    users:[],
    selectedUser: null,
    isChatLoading: false,
    isUserLoading: false,
    error: null,
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        getUsers:(state,action)=>{
            
            state.isUserLoading = false;
            state.users = action.payload;
        },
        getUsersFailure:(state,action)=>{
            state.error = action.payload;
            state.isUserLoading = false;
        },
        getChats:(state,action)=>{
            
            state.isChatLoading = false;
            state.chats = action.payload;
         
        },
        getChatsFailure:(state,action)=>{
            state.isChatLoading = false;
            state.error = action.payload;
        },  
            
            sendChats: (state, action) => {
                state.chats = [...state.chats, action.payload]; 
            },
        setSelectedUser:(state,action)=>{
            state.selectedUser = action.payload;
        },
        setLoadingStates: (state, action) => {
            const { isUserLoading, isChatLoading } = action.payload;
            state.isUserLoading = isUserLoading ?? state.isUserLoading;
            state.isChatLoading = isChatLoading ?? state.isChatLoading;
        }

    }
})

export const { getUsers, getUsersFailure, getChats, getChatsFailure, sendChats,setSelectedUser ,setLoadingStates} = chatSlice.actions;
export default chatSlice.reducer;
