import { GLOBALTYPES } from "./globalTypes"
import { postDataAPI } from "../../utils/fetchData"


export const createNotify = ({ msg, auth, socket }) => async (dispatch) => {
  try {
    const res = await postDataAPI('notify', msg, auth.token)
    console.log(res)
    
  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
  }
}
