import axios from "axios";
import { BASE_URL } from "../utils/url";
import { getUserData } from "../utils/storageHandler";

export const getUserRoleCountsAPI = async () => {
  const userToken = getUserData();
  if (!userToken) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.get(`${BASE_URL}/charts/usercounts`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};

export const getPropertyTypeCountsAPI = async () => {
    const userToken = getUserData();
    if (!userToken) throw new Error("No token found");
  
    try {
      const response = await axios.get(`${BASE_URL}/charts/propertytypes`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      throw error;
    }
  };

export const getCityWiseChartAPI = async () => {
    const userToken = getUserData();
    if (!userToken) throw new Error("No token found");
    
    try {
        const response = await axios.get(`${BASE_URL}/charts/citywise`, {
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
        });
        return response.data;
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        throw error;
    }
    };

export const getSubscriptionChartAPI = async () => {
    const userToken = getUserData();
    if (!userToken) throw new Error("No token found");
    
    try {
        const response = await axios.get(`${BASE_URL}/charts/pricewise`, {
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
        });
        return response.data;
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        throw error;
    }
};

export const getPaymentReportAPI = async (from, to) => {
  const userToken = getUserData(); // Assuming this retrieves the token
  if (!userToken) throw new Error("No token found");

  try {
    const response = await axios.get(`${BASE_URL}/charts/reports`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      params: {
        from: from || undefined, // Only include if from is provided
        to: to || undefined,     // Only include if to is provided
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};