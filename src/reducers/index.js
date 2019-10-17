import { combineReducers } from 'redux';

// import reducers here
import hangmanReducer from './hangmanReducers';
import gameRoomsReducer from './gameRoomsReducers';

// combine reducers
const reducers = combineReducers({
  // key value pairs of name of reducer catagory: imported name on line 3
  hangman: hangmanReducer,
  rooms: gameRoomsReducer
});

export default reducers;
