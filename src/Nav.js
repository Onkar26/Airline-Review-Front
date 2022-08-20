import React from "react";
import { Link } from "react-router-dom";
const Nav = ({ curUser, setCurUser }) => {
  return (
    <nav className="navbar">
      <Link to="/">
        <h3>Flight Review</h3>
      </Link>
      <ul className="menu-list">
        <li>
          <Link to="/favourite">My favourites</Link>
        </li>
        <li>
          {curUser.username === "" ? (
            <Link to="/login">Login</Link>
          ) : (
            <span
              style={{ color: "white" }}
              onClick={() => {
                console.log("span clicked");
                setCurUser({ username: "", password: "" });
              }}
            >
              Logout
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
//onClick={() => setCurUser({ username: "", password: "" })}
