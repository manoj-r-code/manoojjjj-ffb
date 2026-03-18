// import "./Login.css";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {axiosInstance} from "../../services/axiosInstance";
// import chintucat from "../../assets/login-logo.jpg";
// import { Link } from "react-router-dom";

// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate(); // 👈 Create a navigate instance
//   const catMusicURL =
//     "https://res.cloudinary.com/dsvmbo6rb/video/upload/v1745922193/mixkit-sweet-kitty-meow-93_de9sns.mp3";

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axiosInstance.post("/login", { email, password });
//       localStorage.setItem("token", res.data.token);
//       // console.log("Response from login:", res);
//       //   alert("Login Successful! 🎉");
//       toast.success("Login Successful!");

//       const audio = new Audio(catMusicURL);
//       audio.play();
//       // navigate("/home"); // 👈 After successful login, redirect to Home
//       setTimeout(() => {
//         navigate("/home");
//       }, 2000);
//     } catch (err) {
//       console.error(err);
//       toast.error("Login Failed 😢");
//     }
//   };
//   // const handleLogin = async (e) => {
//   //     e.preventDefault();
//   //     try {
//   //       const res = await axiosInstance.post("/auth/login", { email, password });
//   //     //   console.log("Response from login:", res);
//   //       localStorage.setItem("token", res.data.token);
//   //       navigate("/home");
//   //     } catch (err) {
//   //       console.error(err);
//   //       alert("Login Failed 😢");
//   //     }
//   //   };

//   return (
//     <div className="login-page">
//       <div className="login-container">
//         <div className="cat-avatar">
//           <img src={chintucat} alt="Chintu the Cat" />
//           <h2>ChintuVerse</h2>
//         </div>
//         <div className="login-form">
//           <form onSubmit={handleLogin}>
//             <input
//               type="email"
//               placeholder="Your Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <input
//               type="password"
//               placeholder="Secret Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <button type="submit">🐱 Login</button>
//           </form>
//           <Link to="/register" className="register-link">
//             Sign Up
//           </Link>{" "}
//         </div>
//       </div>
//       <ToastContainer
//         position="top-right"
//         autoClose={2000}
//         hideProgressBar={true}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//       />
//     </div>
//   );
// }

// export default Login;


import "./Login.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { axiosInstance } from "../../services/axiosInstance";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      toast.success("Welcome back, Creator 🚀");

      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (err) {
      console.error(err);
      toast.error("Invalid credentials ⚠️");
    }
  };

  return (
    <div className="login-page">
      {/* Animated Background */}
      <div className="background">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="login-container">
        <div className="brand-section">
          <h1>EditVerse</h1>
          <p>Your Creative Control Room</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <Link to="/register" className="register-link">
          Create Account
        </Link>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        theme="dark"
      />
    </div>
  );
}

export default Login;