import React from 'react';

const HangViewer = (props) => {
  console.log('guesses:', props.numFailedGuesses);
  return (
    <div className="hangviewer">
      {/* hang is an array of messages that gets progressively worse as incorrect guesses increases */}
      {props.hang[props.numFailedGuesses]}
    </div>
  );
};

export default HangViewer;
