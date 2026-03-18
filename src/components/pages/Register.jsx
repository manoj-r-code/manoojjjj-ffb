import "./Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {axiosInstance} from "../../services/axiosInstance";
import chintucat from "../../assets/login-logo.jpg";
import { Link } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const navigate = useNavigate(); // 👈 Create a navigate instance
  const catMusicURL =
    "https://res.cloudinary.com/dsvmbo6rb/video/upload/v1745922193/mixkit-sweet-kitty-meow-93_de9sns.mp3";
  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      // alert("Passwords do not match! 😾");
      toast.error("Passwords do not match! 😾");

      return;
    }
    try {
      await axiosInstance.post("/register", { email, password });
      // alert("Registration Successful! 🎉 Now Login.");
      toast.success("Registration Successful! 🎉 Now Login.");

      const audio = new Audio(catMusicURL);
      audio.play();
      // navigate("/");

      setTimeout(() => {
        navigate("/");
      }, 4000);
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message;

      if (err.response?.status === 400 && message === "User already exists") {
        toast.warning("User already exists 😼!");
      } else {
        toast.error("Registration Failed 😢");
      }
      // alert("Registration Failed 😢");
      // toast.error("Registration Failed 😢");
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="cat-avatar">
          <img src={chintucat} alt="Chintu the Cat" />
          <h2>ChintuVerse</h2>
        </div>
        <div className="register-form">
          <form onSubmit={handleRegister}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Repeat Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
            <button type="submit">🐱 Register</button>
          </form>
          <Link to="/" className="register-link">
            Sign In
          </Link>{" "}
        </div>
      </div>
      {/* <ToastContainer /> */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default Register;
