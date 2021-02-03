/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from "react";
import { ResultsHolder, SearchField } from "./Components";
import { Container } from "react-bootstrap";
import axios from "axios";

function App() {
  const [appState, setAppState] = useState("searching"); {/* decides which components will be rendered given the state: searching, playing, over_redo */}
  const [searchTerm, setSearchTerm] = useState(""); {/* holds the search for the current term */}
  const [searchResults, setSearchResults] = useState([]); {/*holds the array of results from initial search*/}

  function doSearch() {
    axios
      .post("/api/search", { data: searchTerm })
      .then((res) => {
        resetAndSetSearchResults(res.data);
      })
      .catch((err) => console.log(err.message));
  }

  function resetAndSetSearchResults(arr) {
    setSearchResults((cur) => cur.splice(0, cur.length));
    setSearchResults(searchResults.concat(arr));
  }

  function setTopUI(_state) {
    switch (_state) {
      case "searching":
        return (
          <SearchField doSearch={doSearch} setSearchTerm={setSearchTerm} />
        );
      case "playing":
        return "Game on!";
      default:
        return "";
    }
  }

  return (
    <div className="App">
      <Container>
        {appState ? setTopUI(appState) : ""}
      </Container>
      <Container>
        <ResultsHolder results={searchResults} />
      </Container>
    </div>
  );
}

export default App;
