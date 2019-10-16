// reducer for all hangman games

import * as types from '../constants/actionTypes';

// set up initial state
const initialState = {
  letters: {}, // tracks which letters have been clicked
  dbQuestion: 'It is the thing you might cut yourself on if you reach out to touch the world like a ball',
  dbAnswer: ['m', 'o', 'u', 'n', 't', 'a', 'i', 'n'],
  inputLetters: [], // array of dashes...
  // gameStore: [
  //   [['It is the thing you might cut yourself on if you reach out to
  // touch the world like a ball'],
  //     ['m', 'o', 'u', 'n', 't', 'a', 'i', 'n'],
  //     ['_', '_', '_', '_', '_', '_', '_', '_']],


  //   [["It's breezy."],
  //     ['f', 'l', 'i', 'g', 'h', 't', 'y'],
  //     ['_', '_', '_', '_', '_', '_', '_']],


  //   [['It hangs in the sky, before it falls, but you do not want to avoid it.'],
  //     ['a', 'p', 'p', 'l', 'e'],
  //     ['_', '_', '_', '_', '_']],
  // ],
  // clue: 'loading', // dummy...?
  answer: [], // wtf is this
  disp: [], // displayed characters that have been clicked?...
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

for (let i = 65; i < 91; i += 1) {
  initialState.letters[String.fromCharCode(i)] = false;
}
console.log('init state', initialState);

const hangmanReducer = (state = initialState, action) => {
  // some let variables to be accessible outside of scope of switch

  switch (action.type) {
    // case: types.WHATEVER
    // return SOMETHING
    default:
      // return the initial state if action.type does not match any of these
      return state;
  }
};

export default hangmanReducer;
