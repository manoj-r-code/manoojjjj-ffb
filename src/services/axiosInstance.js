import axios from "axios";
import { jwtDecode } from "jwt-decode";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000/api/auth", // Adjust your backend URL if different
  baseURL: "https://manoojjjj-bff.onrender.com/api/auth", // Adjust your backend URL if different
});

// Add token automatically to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      //   config.headers["Authorization"] = token;
      config.headers["Authorization"] = `Bearer ${token}`;
      // console.log("Attaching token:", `Bearer ${token}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

let isAdmin = false;
let userEmail = null;

const token = localStorage.getItem("token");

if (token) {
  try {
    const decoded = jwtDecode(token); // { id, email, iat, exp }
    // console.log("Decoded token:", decoded);

    userEmail = decoded.email;
    isAdmin = userEmail === "admin@gmail.com";
  } catch (err) {
    console.error("Invalid token:", err);
  }
}

// Export instance and admin status
export { axiosInstance, isAdmin, userEmail };

// export default axiosInstance;
