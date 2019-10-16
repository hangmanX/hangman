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
    this.socket = io.connect('https://hangmanx-cs.herokuapp.com');
  }

  componentDidMount() {
    // this.socket.on('connect', () => {
    //   console.log('connected to socket');
    // });

    // create socket listener for clicked letter
    this.socket.on('clickedLetter', (letter) => {
      // call dispatch to update letters in store/state
      this.props.updateLetter(letter);

      // check if answer in state has the letter
      if (this.props.dbAnswer.includes(letter)) {
        // call dispatch to update the display answer
        this.props.updateDisplayAnswer(letter);
      } else {
        // this.setState({ numFailedGuesses: this.state.numFailedGuesses + 1 });
        this.props.incrementFailedGuesses();
      }
    });

    // initialize the state keys clue, answer and disp
    // const index = 0;
    // this.setState({
    //   clue: this.state.gameStore[index][0],
    //   answer: this.state.gameStore[index][1],
    // disp: this.state.gameStore[index][2],
    // });
  }

  componentDidUpdate() {
    this.gameEnded();
  }

  gameEnded() {
    // console.log('game ended triggered');
    // check for failure case
    const maxFailedGuesses = this.props.hangingPrompts.length - 1;
    // console.log('max failed gusses', maxFailedGuesses);
    if (this.props.numberOfFailedGuesses === maxFailedGuesses) {
      // eslint-disable-next-line no-alert
      alert(' game over');
    }
    // check for success case
    if (this.props.displayAnswer.join('') === this.props.dbAnswer.join('')) {
      // eslint-disable-next-line no-alert
      alert('success');
    }
  }


  // change state when letter is selected
  letterClicked(letter) {
    // console.log('in letterClicked', this.props);
    // the variable e is a string of the letter that is clicked
    this.socket.emit('clickedLetter', letter);

    // console.log('letter clicked was:', e);
    // https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react

    this.props.updateLetter(letter);

    // check if answer in state has the letter
    if (this.props.dbAnswer.includes(letter)) {
      // call dispatch to update the display answer
      this.props.updateDisplayAnswer(letter);
    } else {
      this.props.incrementFailedGuesses();
      // this.setState({ numFailedGuesses: this.state.numFailedGuesses + 1 });
    }


    // same as above to account for emits from other users??
    // if (this.props.dbAnswer.includes(e)) {
    //   for (let i = 0; i < this.props.dbAnswer.length; i++) {
    //     if (this.props.dbAnswer[i] === e) {
    //       this.setState((prevState) => {
    //         const disp = prevState.disp.slice();
    //         disp[i] = e;
    //         return { disp };
    //       });
    //     }
    //   }
    //   console.log('this letter is in apple: ', e);
    // }
    // else {
    //   this.setState({numFailedGuesses: this.state.numFailedGuesses+1})
    // }

    // this.setState((prevState) => {
    //   const letters = { ...prevState.letters }; // creating copy of state variable
    //   letters[letter] = true; // update the name property, assign a new value
    //   return { letters }; // return new object jasper object
    // });
  }

  render() {
    // console.log('props from redux', this.props.letters);

    // i don't think this is implemented
    // this.socket.on('changeColor', (col) => {
    // document.body.style.backgroundColor = col;
    // });
    // console.log('props in render method', this.props);
    return (
      <div className="App">
        <a href="https://github.com/login/oauth/authorize?client_id=6299af3a88a73b2fd148">Login with Github</a>
        <h1>Hangman X</h1>
        <Clue clue={this.props.dbQuestion} />
        <HangViewer
          hang={this.props.hangingPrompts}
          numFailedGuesses={this.props.numberOfFailedGuesses}
        />
        <LetterWrapper
          letters={this.props.letters}
          letterClicked={this.letterClicked}
          answer={this.props.dbAnswer}
          disp={this.props.displayAnswer}
        />
      </div>
    );
  }
}

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(GameRoom));
// mapDispatchToProps
