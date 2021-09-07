import { MESS_TYPES } from "../actions/messageAction";

const initialState = {
  users: [],
  resultUser: 0,
  data: [],
  firstLoad: false
}

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case MESS_TYPES.ADD_USER:
      if(state.users.every(item => item._id !== action.payload._id)){ //check user isExist in current state ?
        return {
          ...state,
          users: [action.payload, ...state.users]
        };
      }
    return state;
    
    default:
      return state;
  }
}

export default messageReducer
