import axios from "axios";
import { BASE_URL } from "../utils/url";
import { getUserData } from "../utils/storageHandler";

export const processPaymentAPI = async (plan, role = "owner") => {
  const userToken = getUserData();

  const response = await axios.post(
    `${BASE_URL}/payments/checkout`,
    { plan, role },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );

  return response.data;
};

export const getPropertyLimitAPI = async () => {
  const userToken = getUserData();
  if (!userToken) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.get(`${BASE_URL}/payments/getlimit`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    console.log("API Response:", response.data); // Debug: Log response
    return response.data.propertyLimit;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};