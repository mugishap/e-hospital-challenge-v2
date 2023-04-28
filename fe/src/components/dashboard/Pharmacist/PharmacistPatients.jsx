import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify'

const bearer_token = localStorage.getItem("userToken")?.replace(/['"]+/g, "");

const PharmacistPatients = () => {
  const [patients, setPatients] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [patientUsername, setpatientUsername] = useState("");
  const [disease, setDisease] = useState("");
  const [medicineName, setmedicineName] = useState("");
  const [medecines, setMedecines] = useState([]);

  useEffect(() => {
    if (bearer_token) {
      const getPatients = async () => {
        const res = await fetch(
          "http://localhost:4000/api/pharmacist/get-patients",
          {
            method: "GET",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${bearer_token.replaceAll('^"|"$', "")}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        setPatients(data.payload);
      };
      getPatients();
      console.log(patients);
    }
  }, []);

  useEffect(() => {
    if (bearer_token) {
      const getMedecines = async () => {
        const res = await fetch(
          "http://localhost:4000/api/pharmacist/get-medicines",
          {
            method: "GET",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${bearer_token.replaceAll('^"|"$', "")}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        setMedecines(data.payload);
      };
      getMedecines();
      console.log(medecines);
    }
  }, []);

  const handleGivePrescription = async () => {
    try {
      if (bearer_token) {
        const res = await axios.post(
          "http://localhost:4000/api/pharmacist/give-prescription",
          { patientUsername, disease, medicineName },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${bearer_token.replaceAll('^"|"$', "")}`,
            },
          }
        );
        if (res.data.error) {
          toast.error(res.data.error)
        } else {
          toast.success(res.data.message)
        }
      }
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
    <>
      <div className=" margin-auto" style={{ width: 'fit-content' }}>
        <header style={{ display: "flex", justifyContent: "space-around" }}>
          <h1>Patients with their prescriptions</h1>
        </header>
        {patients.length > 0 ? (
          <table style={{ width: "90vw" }}>
            <thead>
              <tr>
                <th>Full names</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Disease</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => {
                return (
                  <tr key={patient.username}>
                    <td>{patient.fullNames}</td>
                    <td>{patient.age}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.consultation.disease}</td>
                    <td>
                      <button
                        className="table-btn"
                        onClick={(e) => {
                          setpatientUsername(patient.username);
                          setDisease(patient.consultation.disease);
                          setModalOpen(true);
                        }}
                        style={{
                          backgroundColor: "#1799b7",
                          color: "#fff",
                          border: "none",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Prescribe
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h3>No patients found</h3>
        )}
      </div>
      <div className={`madalWraper ${modalOpen ? " " : "hidden"}`}>
        <div className="modal-content">
          <div className="header">
            <div
              className="close"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              X
            </div>
          </div>
          <div className="form">
            <div className="inputWrapper">
              <select
                name="medecines"
                style={{
                  width: "100%",
                  height: "35px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  padding: "0 10px",
                  outline: "none",
                  fontSize: "16px",
                }}
                title="meds"
                onChange={(e) => {
                  setmedicineName(e.target.value);
                }}
                required
              >
                <option>Choose Medecine</option>
                {medecines.length > 0 &&
                  medecines.map((medicine) => {
                    console.log(medicine.medName);
                    return (
                      <option value={medicine.medName} key={medicine.medName}>
                        {medicine.medName}
                      </option>
                    );
                  })}
              </select>
            </div>
            <button
              className="submit-button"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleGivePrescription();
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PharmacistPatients;
