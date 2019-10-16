/* eslint-disable linebreak-style */
// ^wtf is this rule...
import React, { Component } from 'react';
import LetterSelector from '../components/letterSelector';
import AnswerViewer from '../components/answerViewer';

const LetterWrapper = (props) => (
  <div className="letterWrapper">
    <AnswerViewer
      answer={props.answer}
      disp={props.disp}
    />
    <LetterSelector
      letters={props.letters}
      disp={props.disp}
      letterClicked={props.letterClicked}
    />
  </div>
);

export default LetterWrapper;
