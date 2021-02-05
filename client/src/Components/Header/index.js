import React, { useState } from "react";
import { Navbar } from "react-bootstrap";

function Header(props) {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand onClick={props.resetGame} style={{ flex: 1 }}>
        Three clicks to jesus
      </Navbar.Brand>
      <Navbar.Text onClick={() => props.setModalView(!props.modalView)}>
        {props.modalView ? "X" : "Instructions"}
      </Navbar.Text>
    </Navbar>
  );
}

export default Header;
