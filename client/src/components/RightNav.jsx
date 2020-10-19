import React from "react";
import styled from "styled-components";
import { logout } from "../helpers";

const Ul = styled.ul`
  list-style: none;
  display: none;
  flex-flow: row nowrap;

  li {
    padding: 18px 10px;
  }

  a {
    text-decoration: none;
    color: #fff;
    margin-left: 5px;
    font-size: 1.1rem;
  }

  #username {
    margin-bottom: 40px;
  }

  #username a {
    font-size: 1.3rem;
  }

  #admin-btn {
    margin: 20px 0;
  }

  #logout-btn {
    margin-top: 40px;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-flow: column nowrap;
    background-color: #AE0400;
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
    top: 0;
    left: 0;
    height: 100vh;
    width: 50vw;
    padding-top: 3.5rem;
    z-index: 10;
    transition: transform 0.3s ease-in-out;
  }
`;

function RightNav(props) {
  return (
    <Ul open={props.open}>
      {props.user._id ? (
        <li id="username">
          <a href="/profile">Welcome, {props.user.name}</a>
        </li>
      ) : (
        ""
      )}
      <li>
        <a href="/cars">Fleet</a>
      </li>
      <li>
        <a href="/membership">Membership</a>
      </li>
      <li>
        <a href="/about">About</a>
      </li>
      <li>
        <a href="/contact">Contact</a>
      </li>
      {props.user.membership === "admin" ? (
        <>
          <div id="admin-btn">
            <li>
              <a href="/setup/add">Add Car</a>
            </li>
            <li>
              <a href="/setup/update">Update Car</a>
            </li>
            <li>
              <a href="/setup/remove">Remove Car</a>
            </li>
          </div>
        </>
      ) : (
        ""
      )}
      {props.user._id ? (
        <li id="logout-btn">
          <a onClick={logout} href="/">
            Logout
          </a>
        </li>
      ) : (
        ""
      )}
    </Ul>
  );
}

export default RightNav;
