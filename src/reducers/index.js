import { combineReducers } from 'redux';

// import reducers here
import hangmanReducer from './hangmanReducers';

// combine reducers
const reducers = combineReducers({
  // key value pairs of name of reducer catagory: imported name on line 3
  hangman: hangmanReducer,
});

export default reducers;
