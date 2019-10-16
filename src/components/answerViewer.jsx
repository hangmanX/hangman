import React, { Component } from 'react';

const AnswerViewer = (props) => {
  // console.log('answer viewer props', props);

  // generate our array of string characters
  const dispCharArray = [];
  for (let i = 0; i < props.disp.length; i += 1) {
    dispCharArray.push(
      <span
        className="answerLetter"
        key={i}
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
