import Home from "./Home";
import Card from "./Card";
import { React, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import LogIn from "./UserAccount/LogIn";
import Forgot from "./UserAccount/Forgot";
import CreateAccount from "./UserAccount/CreateAccount";
const { default: axios } = require("axios");
function App() {
  const [users, setUsers] = useState([]);
  const [curUser, setCurUser] = useState({ username: "", password: "" });
  const getUsers = async () => {
    const resp = await axios.get(`http://localhost:3000/users`);
    setUsers(resp.data);
  };
  // setInterval(() => {
  //   getUsers();
  // }, 60000);
  useEffect(() => {
    if (users.length === 0) {
      getUsers();
    }
    console.log("time");
  }, []);
  return (
    <BrowserRouter>
      <Nav curUser={curUser} setCurUser={setCurUser} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/airlines/:id"
          element={<Card users={users} setUsers={setUsers} curUser={curUser} />}
        ></Route>
        <Route
          path="/login"
          element={<LogIn curUser={curUser} setCurUser={setCurUser} />}
        ></Route>
        <Route path="/forgotpassword" element={<Forgot />} />
        <Route path="/signup" element={<CreateAccount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
