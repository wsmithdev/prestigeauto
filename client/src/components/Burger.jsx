import React, { useState } from "react";
import styled from "styled-components";
import RightNav from "./RightNav";

const StyledBurger = styled.div`
  width: 2rem;
  height: 2rem;
  padding-top: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  right: 20px;
  display: flex;
  justify-content: space-around;
  flex-flow: column nowrap;
  z-index: 11;
  display: none;

  @media (max-width: 768px) {
    display: flex;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => (open ? "#000" : "#fff")};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;

    &:nth-child(1) {
      transform: ${({ open }) =>
        open ? "rotate(45deg) translateX(1px)" : "rotate(0)"};
    }

    &:nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
    }

    &:nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

const Burger = (props) => {
  // State
  const [open, setOpen] = useState(false);

  return (
    <>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>

      <RightNav user={props.user} open={open} />
    </>
  );
};

export default Burger;
