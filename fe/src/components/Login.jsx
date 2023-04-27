/* eslint-disable jsx-a11y/alt-text */
import { Link, useNavigate } from "react-router-dom";
import lockSvg from "../assets/lock.svg";
import eyeSvg from "../assets/eye.svg";
import swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [toggle, setToggle] = useState(1);
  const [loginInfo, setLoginInfo] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(loginInfo);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/login",
        loginInfo,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(res);
      localStorage.setItem("userToken", JSON.stringify(res.data.payload));
      res.data.error
        ? swal.fire("Failed!", res.data.error, "error")
        : swal.fire("Success", res.data.message, "success");
      res.data.message.includes("Logged in Successfully!") &&
        navigate("/dashboard");
    } catch (error) {
      console.log(error);
      swal.fire(
        "Failed!",
        error.response.data.error
          ? error.response.data.error
          : error.response.data.message,
        "error"
      );
    }
  };
  return (
    <div className="fomContainer">
      <form onSubmit={handleLogin}>
        <div className="header">
          <h2>Login as {role}</h2>
          <p>
            Don't have an account ?{" "}
            <Link to="/register" className="link">
              Register
            </Link>
          </p>
          {toggle === 2 && (
            <p
              className="link"
              onClick={() => {
                setToggle(1);
              }}
            >
              Back
            </p>
          )}
        </div>
        {toggle === 1 && (
          <>
            <div className="input">
              <select
                name="roles"
                id="roles"
                onChange={(e) => {
                  setRole(e.target.value);
                }}
                required
              >
                <option>Select Role</option>
                <option value="Patient">Patient</option>
                <option value="Physician">Physician</option>
                <option value="Pharmacist">Pharmacist</option>
              </select>
            </div>
            <div className="btn-container">
              <button
                className="submit-button"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  console.log(role);
                  setToggle(2);
                }}
              >
                Next
              </button>
            </div>
          </>
        )}

        {toggle === 2 && role === "Patient" && (
          <>
            <div className="input">
              <input
                type="text"
                placeholder="Your Username"
                onChange={(e) => {
                  setLoginInfo({ ...loginInfo, username: e.target.value });
                }}
                required
              />
            </div>
            <div className="input password-input">
              <input
                type="password"
                placeholder="Enter your password"
                onChange={(e) => {
                  setLoginInfo({ ...loginInfo, password: e.target.value });
                }}
                required
              />
              <div className="icon">
                <img src={eyeSvg} />
              </div>
            </div>
            <div className="btn-container">
              <div className="lock">
                <img src={lockSvg} />
              </div>
              <button className="submit-button" type="submit">
                Login
              </button>
            </div>
          </>
        )}

        {toggle === 2 && role === "Physician" && (
          <>
            <div className="input">
              <input
                type="email"
                placeholder="Your Email address"
                onChange={(e) => {
                  setLoginInfo({ ...loginInfo, email: e.target.value });
                }}
                required
              />
            </div>
            <div className="input password-input">
              <input
                type="password"
                placeholder="Enter your password"
                onChange={(e) => {
                  setLoginInfo({ ...loginInfo, password: e.target.value });
                }}
                required
              />
              <div className="icon">
                <img src={eyeSvg} />
              </div>
            </div>
            <div className="btn-container">
              <div className="lock">
                <img src={lockSvg} />
              </div>
              <button className="submit-button" type="submit">
                Login
              </button>
            </div>
          </>
        )}

        {toggle === 2 && role === "Pharmacist" && (
          <>
            <div className="input">
              <input
                type="text"
                placeholder="Your phone number"
                onChange={(e) => {
                  setLoginInfo({ ...loginInfo, phone: e.target.value });
                }}
                required
              />
            </div>
            <div className="input password-input">
              <input
                type="password"
                placeholder="Enter your password"
                onChange={(e) => {
                  setLoginInfo({ ...loginInfo, password: e.target.value });
                }}
                required
              />
              <div className="icon">
                <img src={eyeSvg} />
              </div>
            </div>
            <div className="btn-container">
              <div className="lock">
                <img src={lockSvg} />
              </div>
              <button className="submit-button" type="submit">
                Login
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Login;
