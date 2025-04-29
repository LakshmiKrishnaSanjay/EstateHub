import { createSlice } from "@reduxjs/toolkit";
import {jwtDecode } from "jwt-decode";
import { getDecodedData, getUserData } from "../utils/storageHandler";
const userSlice = createSlice({

    name:"user",
    initialState: {
        name:getDecodedData()?.name || null,
        email:getDecodedData()?.email || null,
        token:getUserData() || null,
        id:getDecodedData()?.id || null,
        verified:getDecodedData()?.verified || false,
        isLogin:getUserData() ? true : false,
        role:getDecodedData()?.role || null,
    },

    reducers:{

        login: (state, action) => {
            const token = action.payload.token;
            const decoded = jwtDecode(token);
        
            state.token = token;
            state.email = decoded.email;
            state.name = decoded.name; // optional
            state.role = decoded.role; // optional
            state.isLogin = true;
            state.id = decoded.id; // optional    
            state.verified =decoded.verified    
            sessionStorage.setItem("userData", token); // ✅ this is crucial
        },
        
        signup: (state, action) => {
            const token = action.payload.token;
            const decoded = jwtDecode(token);
        
            state.token = token;
            state.email = decoded.email;
            state.name = decoded.name;
            state.role = decoded.role;
            state.isLogin = true;
            state.id = decoded.id; // optional
        
            sessionStorage.setItem("userData", token); // ✅ same here
        },
        

        logout: (state) => {
            state.name = null;
            state.email = null;
            state.token = null;
            state.isLogin = false;
            state.id = null;
        
            sessionStorage.removeItem("userData"); // ✅ clear token on logout
        },
        
        
    }
})

export const { signup, login, logout } = userSlice.actions;
export default userSlice.reducer;