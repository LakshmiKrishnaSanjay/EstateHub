import axios from "axios";
import { BASE_URL } from "../utils/url";
import { getUserData } from "../utils/storageHandler";

export const addComplaintAPI = async (complaintData) => {
  const token = getUserData();

  const response = await axios.post(`${BASE_URL}/complaints/add`, complaintData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getAllComplaintsAPI = async () => {
  const token = getUserData();

  const response = await axios.get(`${BASE_URL}/complaints/getAll`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateComplaintStatusAPI = async (complaintData) => {
  const token = getUserData();

  const response = await axios.put(`${BASE_URL}/complaints/update`, complaintData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export const deleteComplaintAPI = async (id) => {
  const userToken = getUserData();
  const response = await axios.delete(`${BASE_URL}/complaints/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  return response.data;
};
