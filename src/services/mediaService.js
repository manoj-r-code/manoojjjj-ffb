// import axios from "axios";

// const BASE_URL = "http://localhost:5000/chintu/media";
// // const BASE_URL = "https://chintu-verse-bff.onrender.com/chintu/media";

// export const uploadMedia = async (formData) => {
//   try {
//     const res = await axios.post(`${BASE_URL}/upload`, formData);
//     return res.data;
//   } catch (err) {
//     console.error("Upload failed:", err);
//     return null;
//   }
// };

// export const fetchMedia = async () => {
//   try {
//     const res = await axios.get(`${BASE_URL}/getmedia`);
//     console.log("Fetched media:", res.data); // ✅ Check if it's an array
//     return res.data;
//   } catch (err) {
//     console.error("Fetch failed:", err);
//     return [];
//   }
// };

// export const deleteMedia = async (id) => {
//   try {
//     const res = await axios.delete(`${BASE_URL}/delete/${id}`);
//     return res.data;
//   } catch (err) {
//     console.error("Delete failed:", err);
//     return null;
//   }
// };

import axios from "axios";

// const BASE_URL = "http://localhost:5000/chintu/media";
const BASE_URL = "https://manoojjjj-bff.onrender.com/chintu/media";

// 🔥 Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      // Authorization: ` ${token}`,
    },
  };
};

export const uploadMedia = async (formData) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/upload`,
      formData,
      getAuthHeaders(),
    );
    return res.data;
  } catch (err) {
    console.error("Upload failed:", err?.response?.data || err.message);
    return null;
  }
};

export const fetchMedia = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/getmedia`, getAuthHeaders());
    // console.log("Fetched media:", res.data);
    return res.data;
  } catch (err) {
    console.error("Fetch failed:", err?.response?.data || err.message);
    return [];
  }
};

export const fetchImages = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/images`, getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error("Fetch images failed:", err?.response?.data || err.message);
    return [];
  }
};

export const fetchVideos = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/videos`, getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error("Fetch videos failed:", err?.response?.data || err.message);
    return [];
  }
};

export const fetchAllMedia = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/getmedia`, getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error("Fetch all media failed:", err?.response?.data || err.message);
    return [];
  }
};

export const deleteMedia = async (id) => {
  try {
    const res = await axios.delete(
      `${BASE_URL}/delete/${id}`,
      getAuthHeaders(),
    );
    return res.data;
  } catch (err) {
    console.error("Delete failed:", err?.response?.data || err.message);
    return null;
  }
};
