import React from "react";
import { Modal } from "react-bootstrap";

function InstructionModal(props) {
  return (
    <Modal
      style={{ background: "none" }}
      show={props.modalView}
      onHide={() => props.setModalView(!props.modalView)}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ margin: "auto" }}><strong>Instructions</strong></Modal.Title>
      </Modal.Header>
      <Modal.Body>

          <p>Your goal is to get from the starting page to the target page in three clicks.</p>
        <p>
          <strong>First, </strong>search for a start page and target page. Note that this returns only the top twenty
          associated pages.
        </p>
        <p>When you find your starting page, click it, and the game begins.</p>
        <p>
          <strong>Next, </strong>a page will open with most of the links on the
          page (we've filtered out most extraneous and utility links).
        </p>
        <p>
          At this point, you have three total clicks to get to your target page's link. If, after three clicks, the target link is on that page, click it to win. If not, you lose - either reset the game or click a link to get the loss message. 
        </p>
      </Modal.Body>
    </Modal>
  );
}

export default InstructionModal;
