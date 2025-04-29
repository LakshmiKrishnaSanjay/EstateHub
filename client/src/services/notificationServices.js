import axios from "axios";
import { BASE_URL } from "../utils/url";
import { getUserData } from "../utils/storageHandler";

export const getNotificationsAPI = async () => {
    const userToken = getUserData();
    if (!userToken) {
        throw new Error("No token found");
    }
    
    try {
        const response = await axios.get(`${BASE_URL}/notifications/viewall`, {
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

export const markNotificationAsReadAPI = async (notificationId) => {
    const userToken = getUserData();
    if (!userToken) {
        throw new Error("No token found");
    }

    try {
        const response = await axios.put(
            `${BASE_URL}/notifications/update`,
            { id: notificationId },
            {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        throw error;
    }
};

export const deleteNotificationAPI = async (notificationId) => {
    const userToken = getUserData();
    if (!userToken) {
        throw new Error("No token found");
    }

    try {
        const response = await axios.delete(
            `${BASE_URL}/notifications/delete/${notificationId}`,  // Use route parameter for ID
            {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        throw error;
    }
};

export const deleteAllNotificationsAPI = async () => {
    const userToken = getUserData();
    if (!userToken) {
        throw new Error("No token found");
    }

    try {
        const response = await axios.delete(`${BASE_URL}/notifications/deleteall`, {
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