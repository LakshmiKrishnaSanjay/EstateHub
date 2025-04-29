import axios from "axios"; // adjust if you use a custom axios instance

import { BASE_URL } from '../utils/url'; 
import { getUserData } from "../utils/storageHandler";

// Get all users (admin only)

export const getAllUsers = async()=>{
    const userToken=getUserData()  
    const response=await axios.get(`${BASE_URL}/admin/users`,{
        headers:{
            Authorization: `Bearer ${userToken}`
        }
    })
    return response.data
}


  export const getUserById = async(id)=>{
    const userToken=getUserData()  
    const response=await axios.get(`${BASE_URL}/admin/user/${id}`,{
        headers:{
            Authorization: `Bearer ${userToken}`
        }
    })
    return response.data

}


export const deleteUserById = async (id) => {
    const userToken = getUserData();
    const response = await axios.delete(`${BASE_URL}/admin/deleteuser/${id}`, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    });
    return response.data;
  }

  export const verifyUserById = async (id) => {
    const userToken = getUserData();
    const response = await axios.patch(`${BASE_URL}/admin/user/${id}/verify`, {}, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    });
    return response.data;
  };

  export const getAllPayments = async () => {
    const userToken = getUserData();
    const response = await axios.get(`${BASE_URL}/admin/payments`, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    });
    return response.data;
  };

  export const getDashboardCountsAPI = async () => {
    const userToken = getUserData();
    const response = await axios.get(`${BASE_URL}/admin/counts`, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    });
    return response.data;
  };