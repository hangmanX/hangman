import React, { Component } from 'react';

const AnswerViewer = (props) => {
  // generate our array of string characters
  const dispCharArray = [];
  for (let i = 0; i < props.disp.length; i += 1) {
    dispCharArray.push(
      <span
        className="answerLetter"
        key={`answer_letter${i}`}
      >
        {props.disp[i]}

      </span>,
    );
  }

  return (
    <div id="answerViewer">
      {props.disp}
    </div>
  );
};


export default AnswerViewer;
