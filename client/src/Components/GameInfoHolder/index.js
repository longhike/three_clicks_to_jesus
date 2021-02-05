import React from "react";

function GameInfoHolder(props) {
  return (
    <>
      <h1>Number of clicks: {props.numClicks}</h1>
      <h1>Current page: {props.page}</h1>
    </>
  );
}

export default GameInfoHolder;
