import React from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";

function LinkHolder(props) {
  const results = props.results;

  function makeRequest(a) {
    if (!checkWin(a)) {
      axios
        .post("/api/get-links", { data: a })
        .then((res) => {
          props.resetAndSetSearchResults(res.data);
          props.setNumClicks((clicks) => clicks + 1);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      props.setWin(true);
    }
  }

  function checkWin(term) {
    if (term === "Jesus") {
      return true;
    }
    return false;
  }

  return (
    <ul style={{ listStyleType: "none" }}>
      {results.length > 0 ? (
        results.map((el, idx) => {
          let displayEl = decodeURIComponent(el.split("_").join(" ").trim());
          return (
            <li key={idx} onClick={() => makeRequest(el)}>
              <p>{displayEl}</p>
            </li>
          );
        })
      ) : (
        <Spinner animation="grow" variant="info" />
      )}
    </ul>
  );
}
export default LinkHolder;
