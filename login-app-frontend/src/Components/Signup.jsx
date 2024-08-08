import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
const SlideNavbar = () => {
  const { login } = useAuth();
  const [isChecked, setIsChecked] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const navigate = useNavigate();
  const [signupDetails, setSignupDetails] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleSignupChange = (e) => {
    setSignupDetails({ ...signupDetails, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const minLength = /.{7,}/;
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const number = /\d/;
    const specialChar = /[\W_]/;

    if (!minLength.test(password)) {
      toast.error("Password must be at least 7 characters long.");
      return false;
    }
    if (!uppercase.test(password)) {
      toast.error("Password must contain at least one uppercase letter.");
      return false;
    }
    if (!lowercase.test(password)) {
      toast.error("Password must contain at least one lowercase letter.");
      return false;
    }
    if (!number.test(password)) {
      toast.error("Password must contain at least one number.");
      return false;
    }
    if (!specialChar.test(password)) {
      toast.error("Password must contain at least one special character.");
      return false;
    }
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { password } = signupDetails;
    if (!validatePassword(password)) {
      return;
    }
    try {
      await axios.post(
        "https://etlhive-project-backend.onrender.com/api/auth/signup",
        signupDetails
      );
      toast.success("User created successfully.");
      setIsChecked(false);
      setSignupDetails({ name: "", username: "", password: "" });
    } catch (error) {
      toast.error("User creation failed.");
    }
  };

  const handleLogin = async (e) => {
    console.log("Login attempt with:", loginDetails); // Debugging log
    e.preventDefault();
    console.log("Login attempt with:", loginDetails); // Debugging log
    try {
      const response = await axios.post(
        "https://etlhive-project-backend.onrender.com/api/auth/login",
        loginDetails
      );
      console.log("Login response:", response); // Debugging log
      localStorage.setItem("token", response.data.token);
      toast.success("Login successful.");
      login();
      navigate("/welcome");
    } catch (error) {
      console.error("Login error:", error); // Debugging log
      toast.error(error.response?.data?.error || "Login failed.");
    }
  };

  return (
    <div className="main">
      <input
        type="checkbox"
        id="chk"
        aria-hidden="true"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />

      <div className="signup">
        <form onSubmit={handleSignup}>
          <label htmlFor="chk" aria-hidden="true">
            Sign up
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={signupDetails.name}
            onChange={handleSignupChange}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="User Name"
            value={signupDetails.username}
            onChange={handleSignupChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={signupDetails.password}
            onChange={handleSignupChange}
            required
          />
          <button type="submit">Sign up</button>
        </form>
      </div>

      <div className={`login ${isChecked ? "checked" : ""}`}>
        <form onSubmit={handleLogin}>
          <label htmlFor="chk" aria-hidden="true">
            Login
          </label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={loginDetails.username}
            onChange={handleLoginChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginDetails.password}
            onChange={handleLoginChange}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default SlideNavbar;

//  <HCaptcha
//    sitekey="f5fa74d8-698c-4640-a4e0-b704e4085396"
//    onVerify={handleCaptchaChange}
//  />;
