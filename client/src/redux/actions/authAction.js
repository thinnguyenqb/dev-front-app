import { GLOBALTYPES } from "./globalTypes"
import { postDataAPI } from "../../utils/fetchData"
import valid from '../../utils/valid'

export const TYPES = {
  AUTH: 'AUTH'
}

export const login = (data) => async(dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: true}})
    const res = await postDataAPI('login', data)
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user
      }
    })
    localStorage.setItem("firstLogin", true)

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg
      }
    })

  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    })
  }
}

export const refreshToken = () => async(dispatch) => {
  const firstLogin = localStorage.getItem("firstLogin")
  if(firstLogin){ 
    dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})

    try {
      const res = await postDataAPI('refresh_token')
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user
        }
      })
      dispatch({type: GLOBALTYPES.ALERT, payload: {}})
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg
        }
      })
    }
  }
}

export const register = (data) => async(dispatch) => {
  const check = valid(data) //function
  //console.log(check.errMsg)
  if(check.errLength > 0)
  return dispatch({type: GLOBALTYPES.ALERT, payload: check.errMsg}) // redux
  
  try {
    //action loading
    dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})

    const res = await postDataAPI('register', data)
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user
      }
    })
    localStorage.setItem("firstLogin", true)

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg
      }
    })
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    })
  }
}

export const logout = (data) => async(dispatch) => {
  try {
    localStorage.removeItem('firstlogin')
    await postDataAPI('logout')
    window.location.href = "/"
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    })
  }
}