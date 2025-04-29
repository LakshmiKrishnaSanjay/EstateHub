import axios from "axios";
import { BASE_URL } from "../utils/url";
import { getUserData } from "../utils/storageHandler";

// Get Agent Profile
export const getAgentProfileAPI = async () => {
  const userToken = getUserData();
  const response = await axios.get(`${BASE_URL}/agent/profile`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  return response.data;
};

// Update Agent Profile
export const updateAgentProfileAPI = async (formData) => {
  const userToken = getUserData();
  try {
    const response = await axios.put(`${BASE_URL}/agent/profile`, formData, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in updateAgentProfileAPI:", error.response?.data || error.message);
    throw error;
  }
};