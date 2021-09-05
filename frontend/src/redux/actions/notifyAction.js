import { GLOBALTYPES } from "./globalTypes"
import { getDataAPI, postDataAPI, deleteDataAPI } from "../../utils/fetchData"

export const NOTIFY_TYPES = {
  GET_NOTIFIES: 'GET_NOTIFIES',
  CREATE_NOTIFY: 'CREATE_NOTIFY',
  DELETE_NOTIFY: 'DELETE_NOTIFY',
}

export const createNotify = ({ msg, auth, socket }) => async (dispatch) => {
  try {
    const res = await postDataAPI('notify', msg, auth.token)
    //console.log(res)

    socket.emit('createNotify', {
      ...res.data.notify,
      user: {
        username: auth.user.username,
        avatar: auth.user.avatar
      }
    })
    
  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
  }
}

export const deleteNotify = ({ msg, auth, socket }) => async (dispatch) => {
  try {
    await deleteDataAPI(`notify/${msg.id}?url=${msg.url}`, auth.token)

    socket.emit('deleteNotify', msg)
  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
  }
}

export const getNotifies = (token) => async (dispatch) => {
  try {
    const res = await getDataAPI('notifies', token)
    console.log(res)

    dispatch({ type: NOTIFY_TYPES.GET_NOTIFIES, payload: res.data.notifies })
    
  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
  }
}
