/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import io from 'socket.io-client';
import '../styles/App.css';
import { connect } from 'react-redux';
import LetterWrapper from './letterWrapper';
import Clue from '../components/clue';
import HangViewer from '../components/hangViewer';
import HangingDude from '../components/HangingDude';

// import * as types from '../constants/actionTypes';
import * as actions from '../actions/actions';

// https://codeburst.io/isomorphic-web-app-react-js-express-socket-io-e2f03a469cd3

const mapStateToProps = (state) => ({
  letters: state.hangman.letters,
  dbAnswer: state.hangman.dbAnswer,
  dbQuestion: state.hangman.dbQuestion,
  displayAnswer: state.hangman.displayAnswer,
  hangingPrompts: state.hangman.hangingPrompts,
  numberOfFailedGuesses: state.hangman.numberOfFailedGuesses,
});

const mapDispatchToProps = (dispatch) => ({
  updateLetter(letter) {
    dispatch(actions.updateLetter(letter));
  },
  updateDisplayAnswer(letter) {
    dispatch(actions.updateDisplayAnswer(letter));
  },
  incrementFailedGuesses() {
    dispatch(actions.incrementFailedGuesses());
  },
  checkWin() {
    dispatch(actions.checkWin());
  },
  newQuestion() {
    // console.log('new question clicked!');
    fetch('/newPrompt', {
      headers: {
        'Cache-Control': 'no-cache',
      },
    })
      .then((res) => res.json())
      .then((obj) => {
        const { question, answer } = obj;
        console.log('question and answer', question, answer);
        dispatch(actions.newQuestion(question, answer));
      });
  },
});

class GameRoom extends Component {
  constructor(props) {
    super(props);
    // this.gameEnded = this.gameEnded.bind(this);
    this.letterClicked = this.letterClicked.bind(this);
    this.socket = io.connect('https://hangmanx-cs.herokuapp.com');
  }

  componentDidMount() {
    // destructure props
    const {
      updateLetter, updateDisplayAnswer, incrementFailedGuesses, newQuestion,
    } = this.props;

    // this.socket.on('connect', () => {
    //   console.log('connected to socket');
    // });
    // get a new question (dispatch to props)
    newQuestion();

    // create socket listener for clicked letter
    this.socket.on('clickedLetter', (letter) => {
      // call dispatch to update letters in store/state
      updateLetter(letter);
      // console.log('letter and dbAnswer in GameRoom comp', letter, dbAnswer);
      // check if answer in state has the letter
      if (this.props.dbAnswer.includes(letter)) {
        // call dispatch to update the display answer
        updateDisplayAnswer(letter);
      } else {
        // this.setState({ numFailedGuesses: this.state.numFailedGuesses + 1 });
        incrementFailedGuesses();
      }
    });
  }

  componentDidUpdate() {
    const { checkWin } = this.props;
    checkWin();
  }


  // change state when letter is selected
  letterClicked(letter) {
    // console.log('letter clicked was:', e);

    // destructure props
    const { updateLetter, dbAnswer, updateDisplayAnswer } = this.props;

    // console.log('in letterClicked', this.props);
    // the variable e is a string of the letter that is clicked
    this.socket.emit('clickedLetter', letter);

    // dispatch action to update the letter object in store/state
    // updateLetter(letter);

    // // check if answer in state has the letter
    // if (dbAnswer.includes(letter)) {
    //   // call dispatch to update the display answer
    //   updateDisplayAnswer(letter);
    // }
  }

  render() {
    // console.log('props from redux', this.props.letters);

    // destructure props
    const {
      dbQuestion, dbAnswer, hangingPrompts, numberOfFailedGuesses, letters, displayAnswer,
      newQuestion,
    } = this.props;

    // return all the things and stuff to render
    return (
      <div className="App">
        {/* <img src="./../../dist/imgs/figure1.png" alt="imageone" /> */}
        <Clue clue={dbQuestion} newQuestion={newQuestion} />
        <HangViewer
          hang={hangingPrompts}
          numFailedGuesses={numberOfFailedGuesses}
        />
        <LetterWrapper
          letters={letters}
          letterClicked={this.letterClicked}
          answer={dbAnswer}
          disp={displayAnswer}
        />
        <HangingDude numberOfFailedGuesses={numberOfFailedGuesses} />
      </div>
    );
  }
}

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(GameRoom));
// mapDispatchToProps
