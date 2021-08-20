import { GLOBALTYPES } from "./globalTypes";
import { imageUpload } from "../../utils/imageUpload"
import { postDataAPI } from "../../utils/fetchData";

export const POST_TYPES = {
  CREATE_POST: 'CREATE_POST'
}

export const createPost = ({ content, images, auth }) =>  async (dispatch) => {
  //console.log({content, images, auth})
  let media = []
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
    if (images.length > 0) {
      media = await imageUpload(images)
    }
    //console.log(media)

    const res = await postDataAPI('posts', { content, images: media }, auth.token)
    //console.log(res)

    dispatch({ type: POST_TYPES.CREATE_POST, payload: res.data.newPost })
    
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } })
    
    

  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {error: err.response.data.msg}
    })
  }

}