/* eslint-disable jsx-a11y/alt-text */
import { Link, useNavigate } from "react-router-dom";
import lockSvg from "../assets/lock.svg";
import eyeSvg from "../assets/eye.svg";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "../styles/style.scss";

const Register = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(1);
  const [role, setRole] = useState("");
  const [userData, setUserData] = useState({});

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(userData);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/register",
        { ...userData, role },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      res.data.error
        ? toast.error(res.data.error)
        : toast.success(res.data.message);
      res.data.message.includes("registered successfully!") &&
        navigate("/login");
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
      <form onSubmit={handleRegister} >
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Register</h2>
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
                  console.log(userData);
                  setToggle(2);
                }}
              >
                Next
              </button>
            </div>
          </>
        )}

        {toggle === 2 && (
          <>
            <div className="input">
              <input
                type="text"
                placeholder="Enter your full names"
                onChange={(e) => {
                  setUserData({ ...userData, fullNames: e.target.value });
                  // console.log(userData)
                }}
                required
              />
            </div>
            {role === "Patient" && (
              <div className="input">
                <input
                  type="text"
                  placeholder="Enter your username"
                  onChange={(e) => {
                    setUserData({ ...userData, username: e.target.value });
                  }}
                  required
                />
              </div>
            )}
            {role === "Physician" && (
              <div className="input">
                <input
                  type="email"
                  placeholder="Your Email address"
                  onChange={(e) => {
                    setUserData({ ...userData, email: e.target.value });
                  }}
                  required
                />
              </div>
            )}{" "}
            {role === "Pharmacist" && (
              <div className="input">
                <input
                  type="text"
                  placeholder="Your phone number"
                  onChange={(e) => {
                    setUserData({ ...userData, phone: e.target.value });
                  }}
                  required
                />
              </div>
            )}
            <div className="input password-input">
              <input
                type="password"
                placeholder={`Create a password ${role === "Pharmacist" ? "(9-10 Characters)" : role === "Patient" ? "(4-6 Charactes)" : "(7-8 Characters)"}`}
                onChange={(e) => {
                  setUserData({ ...userData, password: e.target.value });
                }}
                required
              />
              <div className="icon">
                <img src={eyeSvg} />
              </div>
            </div>
            <div className="input">
              <input
                type="number"
                placeholder="Enter your age"
                onChange={(e) => {
                  setUserData({ ...userData, age: e.target.value });
                }}
                required
              />
            </div>
            <div className="radioContainer">
              <div className="radio">
                <input
                  name="gender"
                  type="radio"
                  value="Male"
                  // defaultChecked
                  onChange={(e) => {
                    setUserData({ ...userData, gender: e.target.value });
                  }}
                  required
                />
                <p>Male</p>
              </div>
              <div className="radio">
                <input
                  name="gender"
                  type="radio"
                  value="Female"
                  onChange={(e) => {
                    setUserData({ ...userData, gender: e.target.value });
                  }}
                  required
                />
                <p>Female</p>
              </div>
            </div>
            <div className="btn-container">
              <div className="lock">
                <img src={lockSvg} />
              </div>
              <button className="submit-button" type="submit">
                Sign up
              </button>
            </div>
          </>
        )}

        <div className="header">

          <p>
            Already signed up?{" "}
            <Link to="/login" className="link">
              Login
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
    </div >
  );
};

export default Register;
