import React from "react";
import Header from "./components/header/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Game from "./pages/game/Game";
import Leaderboard from "./pages/leaderboard/Leaderboard";
import { Toaster } from "react-hot-toast";
const App = () => {
  const Pages = ({ children }) => (
    <>
      <Header />
      {children}
    </>
  );

  return (
    <div className="dark">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <Pages>
              <Home />
            </Pages>
          }
        />
        <Route
          path="/game"
          element={
            <Pages>
              <Game />
            </Pages>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <Pages>
              <Leaderboard />
            </Pages>
          }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default App;
