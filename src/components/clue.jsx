/* eslint-disable react/prop-types */
import React from 'react';

const Clue = ({ clue, newQuestion }) => (
  <div className="clue">
    {clue}
    <button id="newQButton" type="button" onClick={newQuestion}>NEW QUESTION</button>
  </div>
);

export default Clue;
