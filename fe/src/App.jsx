/* eslint-disable react/jsx-no-undef */
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/dashboard/Dashboard";
import PharmacistList from "./components/dashboard/Patient/PharmacistList";
import PhysicianList from "./components/dashboard/Patient/PhysicianList";
import Medicines from "./components/dashboard/Pharmacist/Medicines";
import PharmacistPatients from "./components/dashboard/Pharmacist/PharmacistPatients";
import PhysicianPatients from "./components/dashboard/Physician/PhysicianPatients";
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

const App = () => {
  const RequireAuth = ({ children }) => {
    return localStorage.getItem("userToken")?.length &&
      localStorage.getItem("userToken") ? (
      children
    ) : (
      <Navigate to="/login" replace />
    );
  };

  return (
    <>
      <ToastContainer theme="colored" position="top-center" hideProgressBar={true} autoClose={3000} />
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />{" "}
          <Route
            path="/physicians"
            element={
              <RequireAuth>
                <PhysicianList />
              </RequireAuth>
            }
          />
          <Route
            path="/pharmacists"
            element={
              <RequireAuth>
                <PharmacistList />
              </RequireAuth>
            }
          />
          <Route
            path="/medicines"
            element={
              <RequireAuth>
                <Medicines />
              </RequireAuth>
            }
          />
          <Route
            path="/physian-patients"
            element={
              <RequireAuth>
                <PhysicianPatients />
              </RequireAuth>
            }
          />
          <Route
            path="/pharmacist-patients"
            element={
              <RequireAuth>
                <PharmacistPatients />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
