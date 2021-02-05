import React from "react";
import axios from "axios";

function ResultsHolder(props) {
  const results = props.results;

  function makeRequest(a) {
    axios.post("/api/get-links", { data: a })
    .then((res) => {
      props.setPage(a)
      props.resetAndSetSearchResults(res.data)
      props.setAppState("playing")
    })
    .catch(err => {
      console.log(err.message)
    }) 
  }

  return (
    <ul style={{ listStyleType: "none" }}>
      {results.length > 0
        ? results.map((el, idx) => {
            return (
              <li
                key={idx}
                onClick={() => makeRequest(el.title.split(" ").join("_"))}
              >
                <h5 id={el.pageid}>
                  <strong>{el.title}</strong>
                </h5>
                <p dangerouslySetInnerHTML={{ __html: el.snippet }} />
              </li>
            );
          })
        : <p style={{margin: "auto", textAlign: "center"}}>Your results will be shown here</p> }
    </ul>
  );
}
export default ResultsHolder;
