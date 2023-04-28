/* eslint-disable jsx-a11y/alt-text */
import { Link, useNavigate } from "react-router-dom";
import lockSvg from "../assets/lock.svg";
import eyeSvg from "../assets/eye.svg";
import { toast } from "react-toastify";
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
        ? toast.error(res.data.error)
        : toast.success(res.data.message);
      res.data.message.includes("Logged in Successfully!") &&
        navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response.data.error
          ? error.response.data.error
          : error.response.data.message,
      );
    }
  };
  return (
    <div className="fomContainer" style={{ boxShadow: "0 0 10px rgba(0,0,0,0.2)", borderRadius: "10px" }}>
      <h2>Login as {role}</h2>
      <form onSubmit={handleLogin}>
        {toggle === 1 && (
          <>
            <div className="input">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", margin: "2vh 0vw", width: "100%" }}>
                {
                  ["Pharmacist", "Physician", "Patient"].map((_role, index) => (
                    <div key={index} style={{ color: role === _role ? "white" : "#1799b7", backgroundColor: role === _role ? "#1799b7" : "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: "2vh 1vw", width: "30%", border: "3px solid #1799b7", borderRadius: "50px" }} onClick={() => setRole(_role)}>{_role}</div>
                  ))
                }
              </div>
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
                placeholder="Enter your password (4-6 Characters)"
                onChange={(e) => {
                  setLoginInfo({ ...loginInfo, password: e.target.value });
                }}
                required
              />
              <div className="icon">
                <img src={eyeSvg} />
              </div>
            </div>
            <div className="btn-container" >
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
                placeholder="Enter your password (7-8 Characters)"
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
                placeholder="Enter your password (9-10 Characters)"
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
        <div className="header">

          <p>
            Don't have an account ?{" "}
            <Link to="/register" className="link">
              Register
            </Link>
          </p>
          {toggle === 2 && (
            <button
              style={{
                backgroundColor: "#1799b7",
                color: "white",
                border: "none",
                padding: "10px 30px",
                borderRadius: "10px",
              }}
              onClick={() => {
                setToggle(1);
              }}
            >
              Back
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
