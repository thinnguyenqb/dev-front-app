import { GLOBALTYPES } from './../actions/globalTypes';

const initialState = {}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.AUTH: //hành động phân quyền
      return action.payload;
    default:
      return state; //mặc định là trả về state hiện tại
  }
}

export default authReducer

//nhận vào state hiện tại và thông tin action:
//action là một javascript object
//nó có nhiệm vụ biến đổi state cũ sang state mới
//dựa vào action.type: nó quy định đây là loại hành động gì