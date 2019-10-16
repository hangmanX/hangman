import React from 'react';

const LetterSelector = (props) => {
  // see what props/state we're getting
  // console.log('props letters are', props.letters);

  const letterObj = props.letters;
  const letterArr = Object.keys(letterObj);

  // console.log('letterArr is', letterArr);
  // console.log('disp: ', props.disp);

  // generate buttons for each letter
  const letterButtonArr = [];
  for (let i = 0; i < letterArr.length; i += 1) {
    // console.log('letter obj in letterSelector.jsx', letterObj[letterArr[i]]);
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
