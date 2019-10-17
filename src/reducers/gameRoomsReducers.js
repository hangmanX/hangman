import * as types from '../constants/actionTypes';

const initialState = {
  gameRooms: [],
  // roomCount: 1,
}

const gameRoomsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_ROOMS:
      const rooms = [...action.payload]
      return {...state, gameRooms: rooms}
    default:
      return state;
  }
}

export default gameRoomsReducer;
