import Navbar from "./Navbar";
import jwt_decode from "jwt-decode";
import PhysicianList from "./Patient/PhysicianList";
import PhysicianPatients from "./Physician/PhysicianPatients";
import PharmacistPatients from "./Pharmacist/PharmacistPatients";

const Dashboard = () => {
  const bearer_token = localStorage
    .getItem("userToken")
    ?.replace(/['"]+/g, "");

  let user = jwt_decode(bearer_token);
  localStorage.setItem("user", JSON.stringify(user));

  return (
    <div>
      <Navbar />

      {user?.role === "Patient" && <PhysicianList />}

      {user?.role === "Physician" && <PhysicianPatients />}

      {user?.role === "Pharmacist" && <PharmacistPatients />}
    </div>
  );
};

export default Dashboard;
