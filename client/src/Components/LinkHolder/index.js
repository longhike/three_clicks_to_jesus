import React from "react";
import axios from "axios";
import { makeSubArrays } from "./util";

function LinkHolder(props) {
  const results = props.results;

  function makeRequest(a) {
    props.setSearching(true);
    if (!checkWin(a)) {
      axios
        .post("/api/get-links", { data: a })
        .then((res) => {
          props.resetAndSetSearchResults(res.data);
          props.setPage(a)
          props.setNumClicks((clicks) => clicks + 1);
          props.setSearching(false);
        })
        .catch((err) => {
          console.log(err.message);
          props.setSearching(false);
        });
    } else {
      props.setWin(true);
      props.setSearching(false);
    }
  }

  function checkWin(term) {
    if (term === "Jesus" || term === "Jesus Christ") {
      return true;
    }
    return false;
  }

  const resultArr = makeSubArrays(results);

  return (
    <table id="link-table">
      <tbody>
        {resultArr
          ? resultArr.map((a) => {
              return (
                <tr>
                  {a.map((b) => {
                    let displayEl = decodeURIComponent(b.split("_").join(" ").trim());
                    return (
                      <td
                        onClick={() => {
                          makeRequest(b);
                        }}
                      >
                        {displayEl}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          : ""}
      </tbody>
    </table>
  );
}
export default LinkHolder;
