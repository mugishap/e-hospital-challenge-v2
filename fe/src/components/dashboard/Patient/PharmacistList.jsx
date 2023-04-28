/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { CSVLink } from "react-csv";
import axios from "axios";
import { BiDownload } from "react-icons/bi";
import { toast } from 'react-toastify'

const bearer_token = localStorage.getItem("userToken")?.replace(/['"]+/g, "");

const PharmacistList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (bearer_token) {
      const getUsers = async () => {
        const res = await fetch(
          "http://localhost:4000/api/patient/get-pharmacists",
          {
            method: "GET",
            credentials: "include",
            headers: {
              authorization: `Bearer ${bearer_token.replaceAll('^"|"$', "")}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        setUsers(data.payload);
      };

      getUsers();
    }
  }, []);

  const [userPrescription, setUserPrescription] = useState({
    disease: "",
    medecine: { medName: "", medPrice: "", expirationDate: "" },
  });
  const [pharmacistPhone, setPharmacistPhone] = useState("");
  useEffect(() => {
    if (bearer_token) {
      const getUser = async () => {
        const res = await fetch("http://localhost:4000/api/patient/get", {
          method: "GET",
          credentials: "include",
          headers: {
            authorization: `Bearer ${bearer_token.replaceAll('^"|"$', "")}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        const prescription = data.payload.prescription;
        const pharmacist = data.payload.selectedPharmacist;
        setPharmacistPhone(pharmacist.phone);

        const medecine = prescription.medicine;
        setUserPrescription({
          disease: data.payload.prescription.disease,
          medecine: {
            medName: medecine.medName,
            medPrice: medecine.medPrice,
            expirationDate: medecine.expirationDate,
          },
        });
      };

      getUser();
    }
  }, []);

  const handleChoosePharmacist = async (pharmacistPhone) => {
    try {
      if (bearer_token) {
        const res = await axios.post(
          "http://localhost:4000/api/patient/select-pharmacist",
          { pharmacistPhone },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${bearer_token.replaceAll('^"|"$', "")}`,
            },
          }
        );
        if (res.data.error) {
          toast.error(res.data.error);
        } else {
          toast.success(res.data.message);
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

  let prescriptionCsv = [
    ["Disease", "Med-name", "Med-price", "expirationDate", "pharmacist-phone"],
  ];
  let data = [
    userPrescription.disease,
    userPrescription.medecine.medName,
    userPrescription.medecine.medPrice,
    userPrescription.medecine.expirationDate,
    pharmacistPhone,
  ];
  prescriptionCsv.push(data);

  const csvData = prescriptionCsv;

  return (
    <>
      <Navbar />
      <div className="page-wraper">
        <div className="userList">
          <header style={{ display: "flex", justifyContent: "space-around" }}>
            <h1>Available Pharmacists</h1>
          </header>
          <table>
            <thead>
              <tr>
                <th>Full Names</th>
                <th>Phone</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user.phone}>
                    <td>{user.fullNames}</td>
                    <td>{user.phone}</td>
                    <td>{user.age}</td>
                    <td>{user.gender}</td>
                    <td>
                      <ChooseBtn
                        selectHandler={(e) => {
                          e.preventDefault();
                          handleChoosePharmacist(user.phone);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="results">
          <div className="result">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
                width:"80%"
              }}
            >
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%"
              }}>
                <h2 style={{ display: "flex" }}>Prescriptions</h2>
                <CSVLink
                  data={csvData}
                  filename="prescriptions.csv"
                  target="_blank"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    background: "#1799b7",
                    width: "35px",
                    height: "35px",
                    borderRadius: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center"
                  }}
                >
                  <BiDownload style={{ marginTop: "4px" }} size={20} />
                </CSVLink>
              </div>
            </div>

            {userPrescription.disease ? (
              <div className="single-item">
                <h3>Disease: {userPrescription.disease}</h3>
                <div>
                  <h3>Medecine: {userPrescription.medecine.medName}</h3>
                  <h3>Price: {userPrescription.medecine.medPrice}</h3>
                  <h4>
                    Expiration Date: {userPrescription.medecine.expirationDate}
                  </h4>
                </div>
                <h3>Pharmacist phone: {pharmacistPhone}</h3>
              </div>
            ) : (
              <h3>No Prescription found yet</h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

function ChooseBtn(props) {
  return (
    <button className="table-btn" onClick={props.selectHandler}>
      Choose
    </button>
  );
}

export default PharmacistList;
