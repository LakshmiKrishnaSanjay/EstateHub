import { createSlice } from "@reduxjs/toolkit";
import {jwtDecode } from "jwt-decode";
import { getDecodedData, getUserData } from "../utils/storageHandler";
const userSlice = createSlice({

    name:"user",
    initialState: {
        name:getDecodedData()?.name || null,
        email:getDecodedData()?.email || null,
        token:getUserData() || null,
        isLogin:getUserData() ? true : false,
        role:getDecodedData()?.role || null,
    },

    reducers:{

        signup(state){ //action specifies the action performed here
            state.isLogin=true
            state.name=name
            state.email=email
            state.token=token

        },

        login:((state,action)=>{
            console.log(action.payload);
            state.token= action.payload.token
            console.log(action.payload);
            
            const decoded = jwtDecode(action.payload.token)
            console.log(decoded);
            
            state.isLogin=true
            state.name=decoded.name
            state.email=decoded.email
            
        }),

        logout(state){ // action is need only when we need to fetch data
            state.isLogout=false
            state.name = null
            state.email = null
            state.token= null
        },
        
    }
})

export const { signup, login, logout } = userSlice.actions;
export default userSlice.reducer;