import React, { Component } from 'react';

const LetterSelector = (props) => {
  // see what props/state we're getting
  const letterObj = props.letters;
  const letterArr = Object.keys(letterObj);
  // generate buttons for each letter
  const letterButtonArr = [];
  for (let i = 0; i < letterArr.length; i += 1) {
    letterButtonArr.push(
      <button
        type="button"
        key={`${letterArr[i]}_button`}
        className="letterButton"
        disabled={letterObj[letterArr[i]] ? 'disabled' : null}
        onClick={
          () => {
            props.letterClicked(letterArr[i]);
          }
        }
      >
        {letterArr[i]}

      </button>,
    );
  }

  return (
    <div className="letterButtons">
      {letterButtonArr}
    </div>
  );
};


export default LetterSelector;
