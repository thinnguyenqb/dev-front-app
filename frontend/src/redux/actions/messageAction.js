
export const MESSAGE_TYPES = {
  ADD_USER: 'ADD_USER',
}

export const addUser = ({ user, message }) => async (dispatch) => {
  if (message.users.every(item => item._id !== user._id)) {
    dispatch({ type: MESSAGE_TYPES.ADD_USER, payload: user })
  }
}
