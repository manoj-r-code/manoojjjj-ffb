// import { Link } from 'react-router-dom';
// import './NavBar.css';

// function NavBar() {
//     return (
//         <nav className="navbar">
//             <div className="nav-left">
//                 <Link to="/">Home</Link>
//                 <Link to="/fav">Favourites</Link>
//                 <Link to="/gallery">Gallery</Link>
//                 <Link to="/about">About</Link>
//                 <Link to="/game">Game</Link>
//             </div>
//             <div className="nav-right">
//                 <img src="https://cdn-icons-png.flaticon.com/512/616/616408.png" alt="Cat Logo" className="cat-logo" />
//             </div>
//         </nav>
//     );
// }

// export default NavBar;

import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import ThemeToggle from "./ThemeToggle";
import { PawPrint } from "lucide-react";
import React, { useEffect,useState } from "react";
import { jwtDecode } from "jwt-decode";

function NavBar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    // Optional: Clear any app-level auth state if you're using Context or Redux
    navigate("/"); // Redirect to login
  };
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
    // 1. Fetch media on load

    // 2. Check token and set isAdmin
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const email = decoded.email;
        setIsAdmin(email === "admin@gmail.com");
      } catch (err) {
        console.error("Invalid token:", err);
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  }, []);
  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src="/login-logo.jpg" alt="Cat Logo" className="cat-logo" />
        <span className="brand-name">ChintuVerse</span>
      </div>
      <div className="nav-center">
        <Link to="/home">Home</Link>
        <Link to="/gallery">Gallery</Link>
        {/* <Link to="/fav">Favourites</Link> */}
        <Link to="/game">Game</Link>
        {isAdmin ? (
        <Link to="/admin">Admin</Link>
      ) : (
        <div>
        
        </div>
      )}

        {/* <Link to="/chintu">Chintu</Link> */}
      </div>

      <div className="logout">
        <ThemeToggle></ThemeToggle>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
          <PawPrint size={20} style={{ color: "pink", marginBottom: "3px" }} />
        </button>
      </div>

      {/* <button className="logout-icon-btn" onClick={handleLogout} title="Logout">
        <LogOut size={20} />
      </button> */}
    </nav>
  );
}

export default NavBar;
