import * as types from '../constants/actionTypes';

const initialState = {
  gameRooms: [],
}

const gameRoomsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_ROOMS:
      const rooms = [...state.gameRooms, [...action.payload]]
      const updatedGameRooms = state['gameRooms'] = rooms
      return {...state, updatedGameRooms}
    default:
      return state;
  }
}

export default gameRoomsReducer;
