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
import { Container, Spinner } from "react-bootstrap";
import axios from "axios";

function App() {
  const [target, setTarget] = useState("Jesus");
  const [win, setWin] = useState(false); // boolean checking whether current choice is target
  const [modalView, setModalView] = useState(false); // instruction modal view or not
  const [searching, setSearching] = useState(false); // whether the request is in progress (will show loading graphic if so)
  const [appState, setAppState] = useState("searching"); // decides which components will be rendered given the state: searching, playing, win, lose
  const [page, setPage] = useState(""); // the page whose links are currently being displayed
  const [numClicks, setNumClicks] = useState(0); // number of times a user has clicked on a link after having chosen a start page
  const [searchTerm, setSearchTerm] = useState(""); // holds the search for the current term
  const [searchResults, setSearchResults] = useState([]); // holds the array of results from initial search
  useEffect(() => {
    if (numClicks > 3) {
      if (win) {
        setAppState("win");
      } else {
        setAppState("lose");
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
    setSearchResults([]);
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
    if (_state === "searching") {
      return (
        <SearchField
          doSearch={doSearch}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          target={target}
          setTarget={setTarget}
        />
      );
    } else {
      return (
        <GameInfoHolder
          appState={appState}
          target={target}
          numClicks={numClicks}
          page={page}
        />
      );
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
            target={target}
            resetAndSetSearchResults={resetAndSetSearchResults}
            setNumClicks={setNumClicks}
            setSearching={setSearching}
            setWin={setWin}
            setPage={setPage}
          />
        );
      default:
        return;
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
      <Container id="bottom-ui-container">
        {searching ? (
          <div className="spinner-holder">
            <Spinner animation="grow" variant="info" />
          </div>
        ) : appState ? (
          setBottomUI(appState)
        ) : (
          ""
        )}
      </Container>
      <InstructionModal modalView={modalView} setModalView={setModalView} />
    </div>
  );
}

export default App;
