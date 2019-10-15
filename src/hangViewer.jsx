import React, { Component } from 'react';

const HangViewer = (props) => {
  console.log('guesses:', props.numFailedGuesses);
  return (
    <div className="hangviewer">
      {props.hang[props.numFailedGuesses]}
    </div>
  );
};

export default HangViewer;
