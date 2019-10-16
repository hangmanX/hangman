/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import io from 'socket.io-client';
import './App.css';
import LetterWrapper from './letterWrapper';
import Clue from './clue';
import HangViewer from './hangViewer';
import { Route, Link } from 'react-router-dom'
import Splash from './Splash.jsx'

// https://codeburst.io/isomorphic-web-app-react-js-express-socket-io-e2f03a469cd3

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // color: 'red',
      letters: {
        a: false,
        b: false,
        c: false,
        d: false,
        e: false,
        f: false,
        g: false,
        h: false,
        i: false,
        j: false,
        k: false,
        l: false,
        m: false,
        n: false,
        o: false,
        p: false,
        q: false,
        r: false,
        s: false,
        t: false,
        u: false,
        v: false,
        w: false,
        x: false,
        y: false,
        z: false,
      },
      gameStore: [
        [['It is the thing you might cut yourself on if you reach out to touch the world like a ball'],
          ['m', 'o', 'u', 'n', 't', 'a', 'i', 'n'],
          ['_', '_', '_', '_', '_', '_', '_', '_']],


        [["It's breezy."],
          ['f', 'l', 'i', 'g', 'h', 't', 'y'],
          ['_', '_', '_', '_', '_', '_', '_']],


        [['It hangs in the sky, before it falls, but you do not want to avoid it.'],
          ['a', 'p', 'p', 'l', 'e'],
          ['_', '_', '_', '_', '_']],
      ],
      clue: 'loading',
      answer: [],
      disp: [],
      hang: [
        "I'm having a great day and nothing can go wrong.",
        "Who? Me? I didn't do anything.",
        "Oh. What's that?",
        "Who's on trial?",
        "I'm on trial?",
        "I'm guilty?",
        "No. I don't believe it.",
        'Ahh. Help!!',
        'Glugg.',
        'The End,',
      ],
      numFailedGuesses: 0,
    };
    this.gameEnded = this.gameEnded.bind(this);
    this.letterClicked = this.letterClicked.bind(this);
    this.socket = io.connect('http://localhost:3000');
  }

  componentDidMount() {
    this.socket.on('connect', () => {
      console.log('connected to socket');
    });

    this.socket.on('clickedLetter', (e) => {
      this.setState((prevState) => {
        const letters = { ...prevState.letters };
        letters[e] = true;
        return { letters };
      });
      if (this.state.answer.includes(e)) {
        for (let i = 0; i < this.state.answer.length; i++) {
          if (this.state.answer[i] === e) {
            this.setState((prevState) => {
              const disp = prevState.disp.slice();
              disp[i] = e;
              return { disp };
            });
          }
        }
      } else {
        this.setState({ numFailedGuesses: this.state.numFailedGuesses + 1 });
      }
    });

    const index = Math.floor(Math.random() * 3);
    this.setState({
      clue: this.state.gameStore[index][0],
      answer: this.state.gameStore[index][1],
      disp: this.state.gameStore[index][2],
    });
  }

  componentDidUpdate() {
    this.gameEnded();
  }

  gameEnded() {
    // check for failure case
    const maxFailedGuesses = this.state.hang.length - 1;
    if (this.state.numFailedGuesses === maxFailedGuesses) {
      alert(' game over');
    }
    // check for success case
    if (this.state.disp.join('') === this.state.answer.join('')) {
      alert('success');
    }
  }


  // change state when letter is selected
  letterClicked(e) {
    this.socket.emit('clickedLetter', e);

    // https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react

    if (this.state.answer.includes(e)) {
      for (let i = 0; i < this.state.answer.length; i++) {
        if (this.state.answer[i] === e) {
          this.setState((prevState) => {
            const disp = prevState.disp.slice();
            disp[i] = e;
            return { disp };
          });
        }
      }
    }
    // else {
    //   this.setState({numFailedGuesses: this.state.numFailedGuesses+1})
    // }

    this.setState((prevState) => {
      const letters = { ...prevState.letters }; // creating copy of state variable jasper
      letters[e] = true; // update the name property, assign a new value
      return { letters }; // return new object jasper object
    });
  }

  render() {

    this.socket.on('changeColor', (col) => {
      document.body.style.backgroundColor = col;
    });

    this.socket.on('loadRooms', (data)=>{
      console.log('ROOMS', data)
    })
    return (
      <React.Fragment>
        <Route exact path="/" component={Splash}/>

        <Route path="/game/:id">
          <div className="App">
            <a href="https://github.com/login/oauth/authorize?client_id=6299af3a88a73b2fd148">Login with Github</a>
            <h1>Hangman X</h1>
            <Clue clue={this.state.clue} />
            <HangViewer
              hang={this.state.hang}
              numFailedGuesses={this.state.numFailedGuesses}
            />
            <LetterWrapper
              letters={this.state.letters}
              letterClicked={this.letterClicked}
              answer={this.state.answer}
              disp={this.state.disp}
            />
          </div>
        </Route>
      </React.Fragment>
    );
  }
}

export default hot(module)(App);
