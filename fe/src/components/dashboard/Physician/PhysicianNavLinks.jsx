import { Link } from "react-router-dom";

const PhysicianNavLinks = () => {
  return (
    <Link
      style={{
        fontSize: "22px",
        fontWeight: "100",
        textDecoration: "none",
        borderRadius: "20px",
        padding: "1vw",
        backgroundColor: window.location.pathname === "/dashboard" ? "#1799b7" : "white",
        color: window.location.pathname === "/dashboard" ? "white" : "gray"
      }}
      to={"/dashboard"}
    >
      <h6>Patients</h6>
    </Link>
  );
};

export default PhysicianNavLinks;
