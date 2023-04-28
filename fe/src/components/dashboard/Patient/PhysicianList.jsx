/* eslint-disable jsx-a11y/alt-text */
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify'

const bearer_token = localStorage.getItem("userToken")?.replace(/['"]+/g, "");

const PhysicianList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (bearer_token) {
      const getUsers = async () => {
        const res = await fetch(
          "http://localhost:4000/api/patient/get-physicians",
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
  const [userConsultation, setUserConsultation] = useState({
    disease: "",
    physician: { email: "" },
  });
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
        setUserConsultation({
          ...userConsultation,
          disease: data.payload.consultation?.disease,
          physician: { email: data.payload.consultation?.physician.email },
        });
      };

      getUser();
    }
  }, []);

  const handleChoosePhysician = async (physicianEmail) => {
    try {
      if (bearer_token) {
        const res = await axios.post(
          "http://localhost:4000/api/patient/select-physician",
          { physicianEmail },
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
    <div className="page-wraper">
      <div className="userList">
        <header style={{ display: "flex", justifyContent: "space-around" }}>
          <h1>Available Physicians</h1>
        </header>
        {users?.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Full Names</th>
                <th>Email</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user.email}>
                    <td>{user.fullNames}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td>{user.gender}</td>
                    <td>
                      <ChooseBtn
                        selectHandler={(e) => {
                          e.preventDefault();
                          handleChoosePhysician(user.email);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h2>No physicians available yet</h2>
        )}
      </div>
      <div className="results">
        <div className="result">
          <h2 style={{marginBottom:"10px"}}>Consultations</h2>
          {userConsultation.disease ? (
            <div className="single-item">
              <h3>Disease: {userConsultation.disease}</h3>
              <h3>Physician Email: {userConsultation.physician.email}</h3>
            </div>
          ) : (
            <h3>No Consultation found yet</h3>
          )}
        </div>
      </div>
    </div>
  );
};

function ChooseBtn(props) {
  return (
    <button className="table-btn" onClick={props.selectHandler}>
      Choose
    </button>
  );
}

export default PhysicianList;
