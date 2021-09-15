import React, { useState, useEffect } from 'react'
import UserCard from '../UserCard'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { IoImages, IoSend } from "react-icons/io5";
import { FiTrash2 } from "react-icons/fi";
import Icons from '../Icons';
import MsgDisplay from './MsgDisplay';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { imageShow, videoShow } from '../../utils/mediaShow';
import { imageUpload } from '../../utils/imageUpload';
import { addMessage, getMessages} from '../../redux/actions/messageAction';
import LoadIcon from '../../images/loading1.gif'

const RightSide = () => {
  const { auth, message, theme, socket } = useSelector(state => state)
  const dispatch = useDispatch()

  const { id } = useParams()
  const [user, setUser] = useState([])
  const [text, setText] = useState('')
  const [media, setMedia] = useState([])
  const [loadMedia, setLoadMedia] = useState(false)
  
  
  useEffect(() => {
    const newUser = message.users.find(user => user._id === id)
    if (newUser) {
      setUser(newUser)
    }
  }, [message.users, id])

  const handleChangeMedia = (e) => {
    const files = [...e.target.files]
    let err = ""
    let newMedia = []

    files.forEach(file => {
      if (!file) return err = "File does not exist."

      if (file.size > 1024 * 1024 * 10) {
        return err = "The image/video largest is 10mb."
      }
      
      return newMedia.push(file)
    })

    if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err}})
    setMedia([...media, ...newMedia])
  }

  const handleDeleteMedia = (index) => {
    const newArr = [...media]
    newArr.splice(index, 1)
    setMedia(newArr)
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text.trim() && media.length === 0) return;
    setText('')
    setMedia([])
    setLoadMedia(true)

    let newArr = [];
    if (media.length > 0) newArr = await imageUpload(media)
    
    const msg = {
      sender: auth.user._id,
      recipient: id,
      text,
      media: newArr,
      createdAt: new Date().toISOString()
    }
    setLoadMedia(false)
    dispatch(addMessage({msg, auth, socket}))
  }

  useEffect(() => {
    if (id) {
      const getMessagesData = async () => {
        await dispatch(getMessages({auth, id}))
      }
      getMessagesData()
    }

  }, [id, dispatch, auth])

  return (
    <>
      <div className="message_header-right">
        {
          user.length !== 0 &&
          <>
            <UserCard user={user} />
            <span className="message_delete mr-3">
              <FiTrash2/>
            </span>
          </>
        }
      </div>

      <div className="chat_container" id="scroller"
        style={{ height: media.length > 0 ? 'calc(100% - 250px)' : ''}}>
        
        <div className="chat_display" >
          {
            message.data.map((msg, index) => (
              <div key={index}>
                {
                  msg.sender !== auth.user._id &&
                  <div className="chat_row other_message">
                    <MsgDisplay user={user} msg={msg} theme={theme} styleCSS={true}/>
                  </div>
                }
                {
                  msg.sender === auth.user._id &&
                  <div className="chat_row you_message">
                    <MsgDisplay user={auth.user} msg={msg} theme={theme} styleCSS={false}/>
                  </div>
                }
              </div>
            ))
          }
          
          {
            loadMedia &&
            <div className="chat_row you_message">
              <img src={LoadIcon} alt="loading" style={{width: '80px'}}/>
            </div>
          }
          
        </div>
        <div id="anchor"></div>
      </div>

      <div className="show_media" style={{display: media.length > 0 ? 'grid' : 'none'}}>
        {
          media.map((item, index) => (
            <div key={index} id="file_media">
              {
                item.type.match(/video/i)
                ? videoShow(URL.createObjectURL(item), theme)
                : imageShow(URL.createObjectURL(item), theme)
              }
              <i className="far fa-trash-alt" id="image_trash"
                onClick={() => handleDeleteMedia(index)}
                style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
              ></i>
            </div>
          ))
          
        }
      </div>

      <form className="chat_input" onSubmit={handleSubmit}>
        <div className="file_upload-1 mt-2 ml-1">
          <IoImages size="2rem" color="#4F46E5" />
          <input type="file" name="file" id="file" multiple accept="image/*, video/*"
            onChange={handleChangeMedia}/>
        </div>

        <Icons setContent={setText} content={text} theme={theme}/>

        <input type="text" placeholder="Enter your message..."
          value={text} onChange={e => setText(e.target.value)}
          style={{
            filter: theme ? 'invert(1)' : 'invert(0)',
            backgroundColor: theme ? '#040404' : '',
            color: theme ? 'white' : ''
          }}
        />
        
        <button type="submit" className="button mt-2">
          <IoSend color="#4F46E5"/>
        </button>

      </form>
    </>
  )
}

export default RightSide
