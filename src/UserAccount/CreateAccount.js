import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const flexBox = {
  display: "flex",
  height: "40vh",
  width: "40vw",
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

function CreateAccount() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");

  var signUp = async (userdetails) => {
    console.log(userdetails);
    const resp = await axios.post(`http://localhost:3000/users`, userdetails);
    console.log(resp.data);
    alert(resp.data.Action);
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <h1 style={{ textAlign: "center", margin: "2rem" }}>Sign Up</h1>

      <div style={flexBox}>
        <input
          style={inputStyle}
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          style={inputStyle}
          placeholder="Enter  password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input
          style={inputStyle}
          placeholder="Enter your contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        ></input>

        <button
          style={logButton}
          onClick={() =>
            signUp({ username: username, password: password, contact: contact })
          }
        >
          <Link to="/login">Sign Up</Link>
        </button>
      </div>
    </>
  );
}

export default CreateAccount;
