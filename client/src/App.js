/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from "react";
import {
  GameInfoHolder,
  LinkHolder,
  ResultsHolder,
  SearchField,
} from "./Components";
import { Container, Spinner } from "react-bootstrap";
import axios from "axios";

function App() {
  const [win, setWin] = useState(false);
  const [appState, setAppState] = useState("searching"); //decides which components will be rendered given the state: searching, playing, over_redo
  const [numClicks, setNumClicks] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); // holds the search for the current term
  const [searchResults, setSearchResults] = useState([]); // holds the array of results from initial search
  useEffect(() => {
    if (numClicks > 3) {
      if (win) {
        setAppState("win");
      } else {
        setAppState("done");
      }
    }
  }, [win, numClicks]);
  useEffect(() => {
    if (win) {
      setAppState("win");
    }
  }, [win]);

  function checkWin(term) {
    if (term === "Jesus") {
      setWin(!win);
    } else {
      return false;
    }
  }

  // this doSearch function is only to be used to get the original list of pages
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
        return <GameInfoHolder numClicks={numClicks} />;
      case "win":
        return "You won!!!";
      case "done":
        return "Out of clicks - refresh to play again";
      default:
        return "";
    }
  }

  function setBottomUI(_state) {
    switch (_state) {
      case "searching":
        return (
          <ResultsHolder
            results={searchResults}
            resetAndSetSearchResults={resetAndSetSearchResults}
            setAppState={setAppState}
          />
        );
      case "playing":
        return (
          <LinkHolder
            results={searchResults}
            resetAndSetSearchResults={resetAndSetSearchResults}
            setNumClicks={setNumClicks}
            setWin={setWin}
          />
        );
      case "win":
        return "";
      case "done":
        return "";
      default:
        return "";
    }
  }

  return (
    <div className="App">
      <Container>
        {appState ? (
          setTopUI(appState)
        ) : (
          <Spinner animation="grow" variant="info" />
        )}
      </Container>
      <Container>
        {appState ? (
          setBottomUI(appState)
        ) : (
          <Spinner animation="grow" variant="info" />
        )}
      </Container>
    </div>
  );
}

export default App;
