// reducer for all hangman games

import * as types from '../constants/actionTypes';

const initialState = {
  letters: {},
};

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
