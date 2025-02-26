import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    formData: {
        name:"",
        email:"",
        password:"",
    },
    loading: false,
    error: null,
}

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        updateFormData: (state, action) => {
            state.formData = { ...state.formData, ...action.payload };
        },        
        clearFormData: (state, action) =>{
            state.formData = {
                ...(action.payload?.clearName ? { name: "" } : {}),
              email: "",
              password: "",
            }
          }
        }
    })

export const { updateFormData, clearFormData } = formSlice.actions
export default formSlice.reducer
