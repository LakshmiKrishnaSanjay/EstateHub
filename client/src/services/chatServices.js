import axios from "axios";
import { BASE_URL } from "../utils/url";
import { getUserData } from "../utils/storageHandler";

export const getCustomersAPI = async () => {
    const userToken = getUserData();
    if (!userToken) {
        throw new Error("No token found");
    }
    
    try {
        const response = await axios.get(`${BASE_URL}/messages/customers`, {
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
