import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
const { default: axios } = require("axios");

const flexBox = {
  display: "flex",
  height: "40vh",
  width: "40vw",
  // outline: "1px solid red",
  flexDirection: "column",
  borderRadius: "5px",
  backgroundColor: "#ccc",
  alignItems: "center",
  justifyContent: "space-evenly",
  margin: "auto",
  boxShadow: "0px 0px 1px 0px rgba(0,0,0,0.75)",
};
const inputStyle = {
  width: "70%",
  outline: "none",
  border: "1px solid #ccc",
  padding: "0.8rem 1.6rem",
  borderRadius: "5px",
};
const flexRow = {
  display: "flex",
  width: "100%",
  padding: "0.5rem",
  justifyContent: "space-evenly",
  alignItems: "center",
};

const logButton = {
  backgroundColor: "rgb(3,3,44)",
  color: "white",
  border: "1px solid rgb(0,0,6)",
  padding: "0.5rem 1.7rem",
  borderRadius: "5px",
};

function LogIn({ curUser, setCurUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  var logIn = async (userdetails) => {
    console.log(userdetails);
    const resp = await axios.post(
      `http://localhost:3000/users/authenticate`,
      userdetails
    );
    console.log(resp.data);
    if (resp.data.id < 0) {
      alert(resp.data.Access);
    } else if (resp.data.id === 0) {
      // alert(resp.data.Access);
      // alert(resp.data.Access);
      alert("login successful !");
      setCurUser({ username: username, password: password });
      localStorage.setItem("currentUser", username);
      localStorage.setItem("currentUserLogInId", resp.data.id);
    } else {
      alert(resp.data.Access);
      setCurUser({ username: username, password: password });
      localStorage.setItem("currentUser", username);
      localStorage.setItem("currentUserLogInId", resp.data.id);
    }

    setUsername("");
    setPassword("");
  };

  return (
    <>
      <h1 style={{ textAlign: "center", margin: "2rem" }}>Log In</h1>
      <div style={flexBox}>
        <input
          style={inputStyle}
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          style={inputStyle}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <div style={flexRow}>
          <Link style={{ width: "max-content" }} to="/forgotpassword">
            forget password
          </Link>
          <Link style={{ width: "max-content" }} to="/signup">
            create new account
          </Link>
        </div>

        <button
          style={logButton}
          onClick={() => logIn({ username: username, password: password })}
        >
          Log In
        </button>
      </div>
    </>
  );
}

export default LogIn;
