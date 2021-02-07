import React from "react";
import { Col, Row } from "react-bootstrap";

function GameInfoHolder(props) {
  function showRelevantInfo(a) {
    let displayEl = decodeURIComponent(a.page.split("_").join(" ").trim());
    switch (a.appState) {
      case "playing":
        return (
          <Row>
            <Col md={4}>
            <h1>Number of clicks: {a.numClicks}</h1>
            </Col>
            <Col md={4}>
            <h1>Current page: {displayEl}</h1>
            </Col>
            <Col md={4}>
            <h1>Target page: {props.target}</h1>
            </Col>
            
            
            </Row>
        );
      case "win":
        return (
          <>
            <h1>You won!</h1>
            <h4>Click reset on the top bar to play again</h4>
          </>
        );
      case "lose":
        return (
          <>
            <h1>:/ sry, didn't get it this time</h1>
            <h4>Click reset on the top bar to try again</h4>
          </>
        );
      default:
        return;
    }
  }

  return <>{showRelevantInfo(props)}</>;
}

export default GameInfoHolder;
