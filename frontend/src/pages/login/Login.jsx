import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import "../style.scss";
import axios from "axios";

const Login = () => {
  const [userData, setUserData] = useState({
    password: "",
    email: "",
  });

  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const toastOptions = { duration: 1000 };

  const handleValidation = () => {
    const { name, password } = userData;
    if (name === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email, password } = userData;

      if (handleValidation()) {
        const host = `${import.meta.env.VITE_SERVER}/api/auth/login`;

        const response = await axios.post(host, {
          email,
          password,
        });

        const { data } = response;

        if (response.status === 200) {
          Cookie.set("kittenToken", data.jwtToken, { expires: 9 });
          setUserData({
            password: "",
            email: "",
          });

          toast.success("Login successful", {
            duration: 1000,
          });
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      }
    } catch (error) {
      toast.error(error.response.data.message, { duration: 1000 });
    }
  };

  const onShowPass = () => {
    setShowPass((prev) => !prev);
  };

  return (
    <div className="loginContainer">
      <form onSubmit={handleSubmit} className="formContainer">
        <h1>
          <span>Explode💣</span>Kitten
        </h1>
        <h2>Login</h2>
        <div className="inputContainer">
          <label htmlFor="email" className="name">
            Email
          </label>
          <input
            name="email"
            id="email"
            type="email"
            placeholder="Enter your email"
            className="input"
            value={userData.email}
            onChange={onChange}
          />
        </div>

        <div className="inputContainer">
          <label htmlFor="pass" className="name">
            Password
          </label>
          <input
            name="password"
            id="pass"
            type={showPass ? "text" : "password"}
            placeholder="Enter your password"
            className="input"
            value={userData.password}
            onChange={onChange}
          />
        </div>
        <div className="checkbox">
          <input
            value={showPass}
            onChange={onShowPass}
            id="check"
            type="checkbox"
          />
          <label htmlFor="check">Show Password</label>
        </div>
        <button type="submit">Submit</button>
        <p>
          Create an account
          <Link style={{ textDecoration: "none" }} to={"/register"}>
            <span>Register</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
