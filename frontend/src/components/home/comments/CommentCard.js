import React, {useState, useEffect} from 'react'
import Avatar from '../../Avatar'
import { Link } from 'react-router-dom'
import moment from 'moment'
import LikeButton from '../../LikeButton'
import { useSelector, useDispatch } from 'react-redux'
import CommentMenu from './commentMenu';
import { updateComment } from '../../../redux/actions/commentAction'

const CommentCard = ({ comment, post }) => {
  const [content, setContent] = useState('')
  const [readMore, setReadMore] = useState(false)
  
  const [isLike, setIsLike] = useState(false)
  const [onEdit, setOnEdit] = useState(false)
  
  const { auth, theme } = useSelector(state => state)
  const dispatch = useDispatch()
  
  useEffect(() => {
    setContent(comment.content)
  }, [comment])

  const handleLike = () => {
    setIsLike(true)
  }

  const handleUnLike = () => {
    setIsLike(false)
  }

  const styleCard = {
    opacity: comment._id ? 1 : 0.5,
    pointerEvents: comment._id ? 'inherit' : 'none'
  }

  const handleUpdate = () => {
    if (comment.content !== content) {
      dispatch(updateComment({ comment, post, content, auth }))
      setOnEdit(false)
    } else {
      setOnEdit(false)  
    }
  }

  return (
    <div className="comment_card mt-2" style={styleCard}>
      <Link to={`/profile/${comment.user._id}`} className="d-flex text-dark">
        <Avatar src={comment.user.avatar} size="small-avatar" />
        <h6 className="mx-1">{comment.user.username}</h6>
      </Link>

      <div className="comment_content">
        <div className="flex-fill">
          {
            onEdit
              ? <textarea rows="5" value={content}
                onChange={e => setContent(e.target.value)}
                style={{
                  filter: theme ? 'invert(1)' : 'invert(0)',
                  background: theme ? '#111111' : '#eee',
                  color: theme ? 'white' : 'black'
                }}
              />
              :
              <div>
                <span style={{
                  filter: theme ? 'invert(1)' : 'invert(0)',
                  color: theme ? 'white' : 'black'
                }}>
                  {
                    content.length < 100 ? content :
                      readMore ? content + ' ' : content.slice(0, 100) + '...'
                  }
                </span>
                {
                  content.length > 100 &&
                  <span className="readMore" 
                    style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
                    onClick={() => setReadMore(!readMore)}
                  >
                    {readMore ? 'High content' : 'Read more'}
                  </span>
                }
              </div>
          }
        </div>
        <div className="d-flex align-items-center mr-2" style={{cursor: 'pointer'}}>
          <CommentMenu post={post} comment={comment} auth={auth} setOnEdit={setOnEdit}/>
          <LikeButton isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike} typeLike={false}/>
        </div>
      </div>
      <div style={{cursor: 'pointer'}}>
        <small className="text-muted mr-3">
          {moment(comment.createdAt).fromNow()}
        </small>
        <small className="font-weight-bold mr-3">
          {comment.likes.length} likes
        </small>
        {
          onEdit
            ? <>
              <small className="font-weight-bold mr-3"
              onClick={handleUpdate}>
                  update
                </small>
              <small className="font-weight-bold mr-3"
              onClick={e => setOnEdit(false)}>
                  cancel
                </small>
            </>
            : <small className="font-weight-bold mr-3">
                reply
              </small>
        }
      </div>
    </div>
  )
}

export default CommentCard
