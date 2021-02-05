import React, { useState } from "react";
import { Navbar } from "react-bootstrap";

function Header(props) {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand style={{ flex: 1 }}>Three clicks to jesus</Navbar.Brand>
      <Navbar.Text onClick={props.resetGame}>Reset</Navbar.Text>
      <Navbar.Text onClick={() => props.setModalView(!props.modalView)}>
        Instructions
      </Navbar.Text>
    </Navbar>
  );
}

export default Header;
