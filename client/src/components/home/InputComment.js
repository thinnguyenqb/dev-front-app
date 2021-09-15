import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createComment } from '../../redux/actions/commentAction'
import Icons from '../Icons'
import { BiSend } from "react-icons/bi";

const InputComment = ({ children, post, onReply, setOnReply }) => {
  const [content, setContent] = useState('')

  const { auth, socket, theme } = useSelector(state => state)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!content.trim()) {
      if(setOnReply) return setOnReply(false)

    }

    const newComment = {  
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
      reply: onReply && onReply.commentId,
      tag: onReply && onReply.user
    }

    //console.log(newComment)
    dispatch(createComment({ post, newComment, auth, socket }))

    if (setOnReply) return setOnReply(false);
    
  }
  return (
    <form className="card-footer comment_input" onSubmit={handleSubmit}>
      {children}
      <span className="pb-2">
        <Icons setContent={setContent} content={content} theme={theme}/>
      </span>
      <input type="text" placeholder="Add your comments ..."
        value={content} onChange={e => setContent(e.target.value)} />
      
      <button type="submit" className="postBtn">
        <BiSend size="2rem"/>
      </button>
    </form>
  )
}

export default InputComment
