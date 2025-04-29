// reviewServices.js (Frontend Service)
import axios from "axios";
import { BASE_URL } from "../utils/url";
import { getDecodedData, getUserData } from "../utils/storageHandler";

export const addReviewAPI = async (reviewData) => {
    try {
      const userToken = getUserData();
      const decoded = getDecodedData();
  console.log(decoded, "Decoded Data");
  console.log(reviewData, "Review Data");
  
  console.log("Decoded JWT Payload:", decoded);
      const userId = decoded?._id;
      if (userId) reviewData.userId = userId;
  
      const response = await axios.post(`${BASE_URL}/review/add`, reviewData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
  
      return response.data;
    } catch (error) {
      throw error?.response?.data || error.message;
    }
  };

export const getReviewsAPI = async (filter = {}) => {
  try {
    console.log(sessionStorage.getItem("userData"))
    const userToken = getUserData();
    const response = await axios.get(`${BASE_URL}/review/viewall`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      params: filter,
    });
    return response.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};

export const deleteReviewAPI = async (reviewId) => {
  try {
    const userToken = getUserData();
    const response = await axios.delete(`${BASE_URL}/review/delete/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};


export const addReviewToUserAPI = async (userId, reviewData) => {
  try {
    const userToken = getUserData();
    const decoded = getDecodedData();
    console.log(decoded, "Decoded Data");
    
    console.log(reviewData, "Review Data");
    const response = await axios.post(
      `${BASE_URL}/review/addreview/${userId}`,
      reviewData,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};
