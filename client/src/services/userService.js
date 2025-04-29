import axios from "axios";
import { BASE_URL } from "../utils/url";
import { getUserData } from "../utils/storageHandler";

export const loginAPI= async(data)=>{
    const response = await axios.post(`${BASE_URL}/users/login`,data)
    return response.data
}

export const registerAPI= async(data)=>{
    const response = await axios.post(`${BASE_URL}/users/register`,data)
    return response.data
}

export const getProfileAPI= async()=>{
    const userToken=getUserData()  
    const response=await axios.get(`${BASE_URL}/users/view`,{
        headers:{
            Authorization: `Bearer ${userToken}`
        }
    })
    return response.data
}

export const editProfileAPI = async (data) => {
    const userToken = getUserData();
  
    try {
      const response = await axios.put(`${BASE_URL}/users/profileedit`, data, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "multipart/form-data", // 👈 required for image upload
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error in editProfileAPI:", error.response?.data || error.message);
      throw error;
    }
  };
  

  export const forgotAPI=async(data)=>{
    const response=await axios.post(`${BASE_URL}/users/forgot`,data, {
    withCredentials: true, 
    })
    return response.data
    };
    
  export const resetAPI=async(data)=>{
    const response=await axios.post(`${BASE_URL}/users/reset`,data, {
    withCredentials: true, 
    })
    return response.data
    };

export const changePasswordAPI=async(data)=>{
    const userToken=getUserData()  
    const response=await axios.post(`${BASE_URL}/users/changePassword`,data,{
        headers:{
            Authorization: `Bearer ${userToken}`
        }
    })
    return response.data
};