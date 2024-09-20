import React, { useContext, useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiSolidHome } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { PiCat } from "react-icons/pi";
import "./style.scss";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { MdLeaderboard } from "react-icons/md";

import { CiLogin, CiLogout } from "react-icons/ci";

const Header = () => {
  const [menu, setMenu] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("kittenToken");
    toast.success("Signed out successfully", { duration: 1000 });
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  const handleLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    const jwtToken = Cookies.get("kittenToken");
    if (!jwtToken) navigate("/login");
  }, []);

  const jwtToken = Cookies.get("jwtToken");

  return (
    <>
      <nav className="navbar">
        <div onClick={() => navigate("/")} className="logo">
          <p>Explode Kitten</p>
          <PiCat />
        </div>

        <div
          className="menuButton"
          onClick={() => setMenu(!menu)}
          type="button"
        >
          <RxHamburgerMenu />
        </div>

        {menu && (
          <ul className="navbarMenu">
            <li
              onClick={() => {
                navigate("/");
                setMenu(false);
              }}
            >
              <BiSolidHome />
            </li>
            <li>
              <MdLeaderboard
                onClick={() => {
                  navigate("/leaderboard");
                  setMenu(false);
                }}
              />
            </li>
            <li>
              {jwtToken ? (
                <CiLogout onClick={handleLogout} />
              ) : (
                <CiLogin onClick={handleLogin} />
              )}
            </li>
          </ul>
        )}

        <ul className="menu">
          <li onClick={() => navigate("/")}>
            <BiSolidHome />
          </li>
          <li>
            <MdLeaderboard onClick={() => navigate("/leaderboard")} />
          </li>
          <li>
            {jwtToken ? (
              <CiLogout onClick={handleLogout} />
            ) : (
              <CiLogin onClick={handleLogin} />
            )}
          </li>
        </ul>

        <Toaster position="top-center" reverseOrder={false} />
      </nav>
    </>
  );
};

export default Header;
