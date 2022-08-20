import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const flexBox = {
  display: "flex",
  height: "40vh",
  width: "40vw",
  outline: "1px solid red",
  flexDirection: "column",
  borderRadius: "5px",
  backgroundColor: "#ccc",
  alignItems: "center",
  justifyContent: "space-evenly",
  margin: "auto",
};
const inputStyle = {
  width: "70%",
  outline: "none",
  border: "1px solid #ccc",
  padding: "0.8rem 1.6rem",
  borderRadius: "5px",
};

const logButton = {
  backgroundColor: "rgb(3,3,44)",
  color: "white",
  border: "1px solid rgb(0,0,6)",
  padding: "0.5rem 1.7rem",
  borderRadius: "5px",
};

const Forgot = () => {
  const [username, setUsername] = useState("");
  const [contact, setContact] = useState("");

  var forgot = async (details) => {
    console.log(details);
    const resp = await axios.post(
      `http://localhost:3000/users/forgot`,
      details
    );
    console.log(resp.data);
    alert(`Password :${resp.data.password}`);
  };
  return (
    <>
      <h1 style={{ textAlign: "center", margin: "2rem" }}>
        Forgot your password
      </h1>
      <div style={flexBox}>
        <input
          style={inputStyle}
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          style={inputStyle}
          placeholder="Enter your contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        ></input>

        <button
          style={logButton}
          onClick={() => forgot({ username: username, contact: contact })}
        >
          <Link to="/login">Get Password</Link>
        </button>
      </div>
    </>
  );
};

export default Forgot;
