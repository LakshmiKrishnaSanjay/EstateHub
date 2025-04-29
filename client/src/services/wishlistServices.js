import axios from "axios";
import { BASE_URL } from "../utils/url";
import { getUserData } from "../utils/storageHandler";

export const addToWishlistAPI = async (propertyId) => {
    try {
        const userToken = getUserData();
        const response = await axios.post(`${BASE_URL}/wishlist/add/${propertyId}`, {}, {
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
        });
        return response.data;
    } catch (error) {
        throw error?.response?.data || error.message;
    }
    }

export const removeFromWishlistAPI = async (propertyId) => {
    try {
        const userToken = getUserData();
        const response = await axios.delete(`${BASE_URL}/wishlist/remove/${propertyId}`, {
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
        });
        return response.data;
    } catch (error) {
        throw error?.response?.data || error.message;
    }
}

export const getWishlistAPI = async () => {
    try {
        const userToken = getUserData();
        const response = await axios.get(`${BASE_URL}/wishlist/view`, {
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
        });
        return response.data;
    } catch (error) {
        throw error?.response?.data || error.message;
    }
}