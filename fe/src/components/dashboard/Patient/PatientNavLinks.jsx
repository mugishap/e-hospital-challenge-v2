import { Link } from "react-router-dom";

const PatientNavLinks = () => {
  return (
    <>
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
        <h6>Physicians</h6>
      </Link>
      <Link
        style={{
          fontSize: "22px",
          fontWeight: "100",
          textDecoration: "none",
          borderRadius: "20px",
          padding: "1vw",
          backgroundColor: window.location.pathname === "/pharmacists" ? "#1799b7" : "white",
          color: window.location.pathname === "/pharmacists" ? "white" : "gray"
        }}
        to={"/pharmacists"}
      >
        <h6>Pharmacists</h6>
      </Link>


    </>
  );
};

export default PatientNavLinks;
