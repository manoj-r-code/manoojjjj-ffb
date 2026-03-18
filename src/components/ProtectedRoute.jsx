import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
// import axiosInstance from "../services/axiosInstance";
import { axiosInstance } from "../services/axiosInstance";

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsValid(false);
        return;
      }
      try {
        const res = await axiosInstance.get("validate-token");
        setIsValid(res.data.valid);
      } catch (error) {
        setIsValid(false);
      }
    };

    checkToken();
  }, []);

  if (isValid === null) {
    return <div>Loading...</div>;
  }

  return isValid ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
