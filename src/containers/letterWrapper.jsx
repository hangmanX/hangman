/* eslint-disable linebreak-style */
// ^wtf is this rule...
import React from 'react';
import LetterSelector from '../components/letterSelector';
import AnswerViewer from '../components/answerViewer';

const LetterWrapper = ({
  answer, disp, letters, letterClicked,
}) => (
  <div className="letterWrapper">
    <AnswerViewer
      answer={answer}
      disp={disp}
    />
    <LetterSelector
      letters={letters}
      disp={disp}
      letterClicked={letterClicked}
    />
  </div>
);

export default LetterWrapper;
