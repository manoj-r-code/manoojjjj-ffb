// import "./App.css";
// import NavBar from "./components/NavBar";
// import { Routes, Route } from "react-router-dom";
// import Home from "./components/pages/Home";
// import GameBoard from "./components/pages/Game";
// import Gallery from "./components/pages/Gallery";
// import Login from "./components/pages/Login";
// import Register from "./components/pages/Register";

// function App() {
//   return (
//     <>
//       <NavBar />
//       <main className="main-content">
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/" element={<Home />}></Route>
//           <Route path="/gallery" element={<Gallery />}></Route>
//           <Route path="/game" element={<GameBoard />}></Route>
//         </Routes>
//       </main>
//     </>
//   );
// }

// export default App;

import "./App.css";
import NavBar from "./components/NavBar";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/pages/Home";
import GameBoard from "./components/pages/Game";
import Gallery from "./components/pages/Gallery";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Admin from "./components/pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const location = useLocation(); // Get the current route path

  // Check if current path is login or register
  const hideNavBar =
    location.pathname === "/" || location.pathname === "/register";
  // location.pathname === "/login";

  return (
    <>
      {!hideNavBar && <NavBar />}{" "}
      {/* Only show NavBar if not on login/register */}
      <main className="main-content">
        <Routes>
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          {/* <Route path="/gallery" element={<Gallery />} /> */}
          <Route
            path="/gallery"
            element={
              <ProtectedRoute>
                <Gallery />
              </ProtectedRoute>
            }
          />
          <Route
            path="/game"
            element={
              <ProtectedRoute>
                <GameBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
