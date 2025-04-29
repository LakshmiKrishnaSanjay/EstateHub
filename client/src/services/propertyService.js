import axios from "axios";
import { BASE_URL } from "../utils/url";
import { getUserData } from "../utils/storageHandler";

const getToken = () => {
  const data = getUserData();
  return data?.token || data;
};

export const createPropertyAPI = async (formData) => {
  try {
    const userToken = getToken();
    const response = await axios.post(`${BASE_URL}/property/add`, formData, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};

export const viewPropertyAPI = async () => {
  try {
    const userToken = getToken();
    const response = await axios.get(`${BASE_URL}/property/getall`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};

export const showPropertyAPI = async (propertyId) => {
  try {
    const userToken = getToken();
    const response = await axios.get(`${BASE_URL}/property/viewall/${propertyId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};

export const deletePropertyAPI = async (propertyId) => {
  try {
    const userToken = getToken();
    const response = await axios.delete(`${BASE_URL}/property/delete/${propertyId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};


export const getPropertiesAPI = async (propertyId) => {
  try {
    const userToken = getToken();
    const response = await axios.get(`${BASE_URL}/property/view/${propertyId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};


export const editPropertyAPI = async ({ id, data }) => {
  try {
    const userToken = getToken();
    const response = await axios.put(`${BASE_URL}/property/edit/${id}`, data, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};

export const getPropertyAPI = async (propertyId) => {
  try {
    const userToken = getToken();
    const response = await axios.get(`${BASE_URL}/property/getproperty`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};

export const searchPropertiesAPI = async (searchParams) => {
  try {
    const userToken = getToken();
    const response = await axios.post(`${BASE_URL}/property/search`, searchParams, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }

};

export const getPropertyByIdAPI = async (propertyId) => {
  try {
    const userToken = getToken();
    const response = await axios.get(`${BASE_URL}/property/getbyid/${propertyId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};

export const getProfileByUserIdAPI = async (userId) => {
  try {
    const userToken = getToken();
    const response = await axios.get(`${BASE_URL}/property/profile/${userId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};

export const getFeaturedPropertiesAPI = async () => {
  try {
    const userToken = getToken();
    const response = await axios.get(`${BASE_URL}/property/featured`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};

export const getGoodReviewsAPI = async () => {
  try {
    const userToken = getToken();
    const response = await axios.get(`${BASE_URL}/property/goodreviews`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};