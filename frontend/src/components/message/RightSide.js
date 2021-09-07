import React, { useState, useEffect } from 'react'
import UserCard from '../UserCard'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RiDeleteBin4Line, RiSendPlane2Line } from "react-icons/ri";
import MsgDisplay from './MsgDisplay';

const RightSide = () => {
  const { auth, message } = useSelector(state => state)
  const dispatch = useDispatch()

  const { id } = useParams()
  const [user, setUser] = useState([])
  const [text, setText] = useState('')
  
  
  useEffect(() => {
    const newUser = message.users.find(user => user._id === id)
    if (newUser) {
      setUser(newUser)
    }
  }, [message.users, id])

  return (
    <>
      <div className="message_header-right">
        <UserCard user={user} />
        <span className="message_delete">
          <RiDeleteBin4Line />
        </span>
      </div>

      <div className="chat_container">
        <div className="chat_display">
          <div className="chat_row other_message">
            <MsgDisplay user={user}/>
          </div>
          <div className="chat_row you_message">
            <MsgDisplay user={auth.user}/>
          </div>
        </div>
      </div>
      <form className="chat_input">
        <input type="text" placeholder="Enter your message..."
          value={text} onChange={e => setText(e.target.value)} />
        
        <button type="submit" className="button">
          <RiSendPlane2Line />
        </button>

      </form>
    </>
  )
}

export default RightSide
