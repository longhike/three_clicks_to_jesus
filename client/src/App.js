/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from "react";
import {
  GameInfoHolder,
  Header,
  InstructionModal,
  LinkHolder,
  ResultsHolder,
  SearchField,
} from "./Components";
import { Container, Navbar, Spinner } from "react-bootstrap";
import axios from "axios";

function App() {
  const [win, setWin] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [searching, setSearching] = useState(false);
  const [appState, setAppState] = useState("searching"); //decides which components will be rendered given the state: searching, playing, over_redo
  const [page, setPage] = useState("");
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

  function resetGame() {
    setWin(false);
    setModalView(false);
    setSearching(false);
    setAppState("searching");
    setPage("");
    setNumClicks(0);
    setSearchTerm("");
    setSearchResults((cur) => cur.splice(0, cur.length));
  }
  function doSearch() {
    if (searchTerm) {
      setSearching(true);
      axios
        .post("/api/search", { data: searchTerm })
        .then((res) => {
          resetAndSetSearchResults(res.data);
          setSearching(false);
        })
        .catch((err) => {
          console.log(err.message);
          setSearching(false);
        });
    } else {
      return;
    }
  }

  function resetAndSetSearchResults(arr) {
    setSearchResults((cur) => cur.splice(0, cur.length));
    setSearchResults(searchResults.concat(arr));
  }

  function setTopUI(_state) {
    switch (_state) {
      case "searching":
        return (
          <SearchField
            doSearch={doSearch}
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
          />
        );
      case "playing":
        return <GameInfoHolder numClicks={numClicks} page={page} />;
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
            setPage={setPage}
          />
        );
      case "playing":
        return (
          <LinkHolder
            results={searchResults}
            resetAndSetSearchResults={resetAndSetSearchResults}
            setNumClicks={setNumClicks}
            setSearching={setSearching}
            setWin={setWin}
            setPage={setPage}
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
      {/* NAVBAR */}
      <Header
        resetGame={resetGame}
        setModalView={setModalView}
        modalView={modalView}
      />
      {/* TOP UI */}
      <Container id="top-ui-container">
        {appState ? (
          setTopUI(appState)
        ) : (
          <Spinner animation="grow" variant="info" />
        )}
      </Container>
      {/* BOTTOM UI */}
      {searching ? (
        <Spinner animation="grow" variant="info" />
      ) : (
        <Container id="bottom-ui-container">
          {appState ? (
            setBottomUI(appState)
          ) : (
            <Spinner animation="grow" variant="info" />
          )}
        </Container>
      )}
      <InstructionModal modalView={modalView} setModalView={setModalView} />
    </div>
  );
}

export default App;
