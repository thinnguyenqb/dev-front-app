import React, {useState, useEffect} from 'react'
import Avatar from '../../Avatar'
import { Link } from 'react-router-dom'
import moment from 'moment'

const CommentCard = ({ comment, post }) => {
  const [content, setContent] = useState('')
  const [readMore, setReadMore] = useState(false)
  
  useEffect(() => {
    setContent(comment.content)
  }, [comment])

  return (
    <div className="comment_card mt-2">
      <Link to={`/profile/${comment.user._id}`} className="d-flex text-dark">
        <Avatar src={comment.user.avatar} size="small-avatar" />
        <h6 className="mx-1">{comment.user.username}</h6>
      </Link>

      <div className="comment_content">
        <div className="flex-fill">
          <span>
            {
              content.length < 100 ? content :
              readMore ? content + ' ': content.slice(0, 100) + '...'
            }
          </span>
          {
            content.length > 100 &&
            <span className="readMore" onClick={() => setReadMore(!readMore)}>
              {readMore ? 'High content' : 'Read more'}
            </span>
          }
        </div>
        <div style={{cursor: 'pointer'}}>
          <small className="text-muted mr-3">
            {moment(comment.createdAt).fromNow()}
          </small>
          <small className="text-muted mr-3">
            {comment.likes.length} likes
          </small>
          <small className="text-muted mr-3">
            reply
          </small>
        </div>

      </div>
    </div>
  )
}

export default CommentCard
