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

// import * as types from '../constants/actionTypes';
import * as actions from '../actions/actions';

// https://codeburst.io/isomorphic-web-app-react-js-express-socket-io-e2f03a469cd3
var socketIO = io("/room");

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
});

class GameRoom extends Component {
  constructor(props) {
    super(props);
    this.gameEnded = this.gameEnded.bind(this);
    this.letterClicked = this.letterClicked.bind(this);
    this.socket = io.connect('localhost:3000');
  }

  componentDidMount() {
    // destructure props
    const {
      updateLetter, dbAnswer, updateDisplayAnswer, incrementFailedGuesses,
    } = this.props;

    // this.socket.on('connect', () => {
    //   console.log('connected to socket');
    // });

    // create socket listener for clicked letter
    this.socket.on('clickedLetter', (letter) => {
      // call dispatch to update letters in store/state
      updateLetter(letter);

      // check if answer in state has the letter
      if (dbAnswer.includes(letter)) {
        // call dispatch to update the display answer
        updateDisplayAnswer(letter);
      } else {
        // this.setState({ numFailedGuesses: this.state.numFailedGuesses + 1 });
        incrementFailedGuesses();
      }
    });

  }

  componentDidUpdate() {
    this.gameEnded();
  }

  gameEnded() {
    // destructure props
    const {
      hangingPrompts, displayAnswer, dbAnswer, numberOfFailedGuesses,
    } = this.props;

    // check for failure case
    const maxFailedGuesses = hangingPrompts.length - 1;
    // console.log('max failed gusses', maxFailedGuesses);
    if (numberOfFailedGuesses === maxFailedGuesses) {
      // eslint-disable-next-line no-alert
      alert('game over');
    }
    // check for success case
    if (displayAnswer.join('') === dbAnswer.join('')) {
      // eslint-disable-next-line no-alert
      alert('success');
    }
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
    updateLetter(letter);

    // check if answer in state has the letter
    if (dbAnswer.includes(letter)) {
      // call dispatch to update the display answer
      updateDisplayAnswer(letter);
    }
  }

  render() {
    // console.log('props from redux', this.props.letters);
  
    // destructure props
    const {
      dbQuestion, dbAnswer, hangingPrompts, numberOfFailedGuesses, letters, displayAnswer,
    } = this.props;

    // return all the things and stuff to render
    return (
      <div className="App">
        <Clue clue={dbQuestion} />
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
      </div>
    );
  }
}

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(GameRoom));
// mapDispatchToProps
