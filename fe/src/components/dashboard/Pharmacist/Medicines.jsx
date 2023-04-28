/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify'

import Navbar from "../Navbar";
import { BiPlus } from 'react-icons/bi'
const Medicines = () => {
  const [medecines, setMedecines] = useState([]);
  const [medData, setMedData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);


  const bearer_token = localStorage.getItem("userToken")?.replace(/['"]+/g, "");

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

  const handleAddMed = async (e) => {
    e.preventDefault();
    console.log(medData);
    try {
      if (bearer_token) {
        const res = await axios.post(
          "http://localhost:4000/api/pharmacist/add-medicine",
          medData,
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
          setMedecines([...medecines, medData]);
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
    <div>
      <Navbar />


      <div className="userList margin-auto">
        <header style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>Available Medecines</h1>
          <button className="add" style={{ cursor: "pointer" }} onClick={() => setModalOpen(true)}><BiPlus size={25} /></button>
        </header>
        <table>
          <tr>
            <th>Medicine Name</th>
            <th>Medicine Price</th>
            <th>Expiration Date</th>
          </tr>
          {medecines.map((med) => {
            return (
              <tr>
                <td>{med.medName}</td>
                <td>{med.medPrice}</td>
                <td>{med.expirationDate}</td>
              </tr>
            );
          })}
        </table>
      </div>

      <div className={`madalWraper ${modalOpen ? ' ' : 'hidden'}`} >
        <div className="modal-content">
          <div className="header">
            <div className="close" onClick={() => {
              setModalOpen(false)
            }}>X</div>
          </div>
          <div className="form">
            <form onSubmit={(e) => {
              handleAddMed(e)
              setModalOpen(false)
            }}>
              <div className="header">
                <h2 style={{marginBottom:"10px"}}>Add New Medicine</h2>
              </div>
              <div className="input">
                <input
                  type="text"
                  placeholder="Medicine name"
                  onChange={(e) => {
                    setMedData({ ...medData, medName: e.target.value });
                  }}
                  required
                />
              </div>
              <div className="input">
                <input
                  type="number"
                  placeholder="Price"
                  onChange={(e) => {
                    setMedData({ ...medData, medPrice: e.target.value });
                  }}
                  required
                />
              </div>
              <div className="input">
                <input
                  type="date"
                  onChange={(e) => {
                    setMedData({ ...medData, expirationDate: e.target.value });
                  }}
                  required
                />
              </div>
              <div className="btn-container">
                <button className="submit-button" type="submit">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Medicines;
