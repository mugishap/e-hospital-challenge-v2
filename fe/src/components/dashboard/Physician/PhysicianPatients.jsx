import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify'

const bearer_token = localStorage.getItem("userToken")?.replace(/['"]+/g, "");

const PhysicianPatients = () => {
  const [patients, setPatients] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [disease, setDisease] = useState("");
  const [patientUsername, setpatientUsername] = useState("");

  useEffect(() => {
    if (bearer_token) {
      const getPatients = async () => {
        const res = await fetch(
          "http://localhost:4000/api/physician/get-patients",
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

  const handleGiveConsultation = async () => {
    try {
      if (bearer_token) {
        const res = await axios.post(
          "http://localhost:4000/api/physician/give-consultation",
          { patientUsername, disease },
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
      <div className="userList">
        <header style={{ display: "flex", justifyContent: "space-around" }}>
          <h1>A list of patients selected you as their physician</h1>
        </header>
        {patients.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Full names</th>
                <th>Username</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => {
                return (
                  <tr key={patient.username}>
                    <td>{patient.fullNames}</td>
                    <td>{patient.username}</td>
                    <td>{patient.age}</td>
                    <td>{patient.gender}</td>
                    <td>
                      <button
                        className="table-btn"
                        onClick={(e) => {
                          setpatientUsername(patient.username);
                          setModalOpen(true);
                        }}
                      >
                        Consult
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h2>No patients yet</h2>
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
              <input
                type="text"
                placeholder="Disease details"
                onChange={(e) => {
                  setDisease(e.target.value);
                }}
              />
            </div>
            <button
              className="submit-button"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                setModalOpen(false)
                handleGiveConsultation();
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

export default PhysicianPatients;
