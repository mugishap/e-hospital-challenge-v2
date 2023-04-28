import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import PatientNavLinks from "./Patient/PatientNavLinks";
import PhysicianNavLinks from "./Physician/PhysicianNavLinks";
import PharmacistNavLinks from "./Pharmacist/PharmacistNavLinks";

const Navbar = () => {
  let navigate = useNavigate();

  const bearer_token = localStorage
    .getItem("userToken")
    ?.replace(/['"]+/g, "");

  let user = jwt_decode(bearer_token);
  localStorage.setItem("user", JSON.stringify(user));

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1vh 1vw",
        alignItems: 'center',
        background: "#fff",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        width: "100%",

      }}
    >
      <div>Dashboard</div>
      <div
        style={{
          display: "flex",
          gap: "35px",
        }}
      >
        {user?.role === "Patient" && <PatientNavLinks />}
        {user?.role === "Physician" && <PhysicianNavLinks />}
        {user?.role === "Pharmacist" && <PharmacistNavLinks />}
      </div>

      <Button
        className="btn logout-btn"
        onClick={() => {
          localStorage.removeItem("userToken");
          navigate("/login");
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default Navbar;
