/* eslint-disable import/prefer-default-export */
/**
 * ************************************
 *
 * @module  actions.js
 * @author
 * @date
 * @description Action Creators
 *
 * ************************************
 */

// import actionType constants
import * as types from '../constants/actionTypes';

// this action is for updating the letters object in store that tracks all letters
// of the alphabet
export const updateLetter = (letter) => ({
  type: types.UPDATE_LETTER,
  payload: letter,
});

export const selectQuestion = () => ({
  type: types.SELECT_QUESTION,
  payload: null,
});


// this action is for updating the displayed answer
export const updateDisplayAnswer = (letter) => ({
  type: types.UPDATE_DISPLAY_ANSWER,
  payload: letter,
});

export const incrementFailedGuesses = () => ({
  type: types.INCREMENT_FAILED_GUESSES,
  payload: null,
});

export const updateRoomsToDisplay = (rooms) => ({
  type: types.LOAD_ROOMS,
  payload: rooms,
});
