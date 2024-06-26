import { MESS_TYPES } from "../actions/messageAction";

const initialState = {
  users: [],
  resultUsers: 0,
  data: [],
  resultData: 0,
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

    case MESS_TYPES.ADD_MESSAGE:
      return {
        ...state,
        data: [...state.data, action.payload],
        users: state.users.map(user => 
          user._id === action.payload.recipient || user._id === action.payload.sender
          ? {
              ...user, 
              text: action.payload.text, 
              media: action.payload.media,
          }
          : user
        ),
      };
    
    case MESS_TYPES.GET_CONVERSATIONS:
      return {
        ...state,
        users: action.payload.newArr,
        resultUsers: action.payload.result,
        firstLoad: true,
      };
    
    case MESS_TYPES.GET_MESSAGES:
      return {
        ...state,
        data: action.payload.messages.reverse(),
        resultData: action.payload.result,
      };
    
    default:
      return state;
  }
}

export default messageReducer
