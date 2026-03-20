// services/adminServices.js
import axios from "axios";

// const BASE_URL = 'http://localhost:5000/admin';
const BASE_URL = "https://manoojjjj-bff.onrender.com/admin";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      // Authorization: ` ${token}`,
    },
  };
};

export const getAllUsers = async () => {
  const res = await axios.get(`${BASE_URL}/users`, getAuthHeaders());
  return res.data;
};

export const deleteUserById = async (id) => {
  const res = await axios.delete(
    `${BASE_URL}/delete-user/${id}`,
    getAuthHeaders(),
  );
  return res.data;
};
