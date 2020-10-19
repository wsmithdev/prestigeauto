import React from "react";
import styled from "styled-components";
import Burger from "./Burger";
import { logout } from "../helpers";

// Import CSS
import "./styles/navbarStyle.css"

// Logo
import Logo from "../icons/logo/logo_trans.png"

// Navbar
const Nav = styled.nav`
  width: 100%;
  height: 65px;
  border-bottom: 4px solid #AE0400;
  display: flex;
  background-color: rgb(66,66,66);
`;

function RespNavbar(props) {
  return (
    <Nav>
      <Burger user={props.user} />
      <div id="logo">
        <a href="/">
          <img src={Logo} alt="" />
        </a>
      </div>
      <div className="navbar-btn">
        <a href="/fleet">Fleet</a>
        <a href="/membership">Memberships</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        {
          props.user.membership === "admin" ? (
            <>
            <a href="/setup/add">Add Car</a>
            <a href="/setup/update">Update Car</a>
            <a href="/setup/remove">Remove Car</a>
            </>
          ) : ""
        }
      </div>
      <div id="navbar-spacer"></div>
      <div className="navbar-btn login-logout">
        {props.user._id ? (
          <>
            <a href="/profile">Welcome, {props.user.name}</a>
            <a onClick={logout} href="/">
              Logout
            </a>
          </>
        ) : (
          <>
            <a href="/login">Login</a>
            <a href="/signup">Sign Up</a>
          </>
        )}
      </div>
    </Nav>
  );
}

export default RespNavbar;
