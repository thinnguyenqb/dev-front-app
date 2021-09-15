import React, {useState, useEffect} from 'react'
import Avatar from '../../Avatar'
import { Link } from 'react-router-dom'
import moment from 'moment'
import LikeButton from '../../LikeButton'
import { useSelector, useDispatch } from 'react-redux'
import CommentMenu from './commentMenu';
import { updateComment, likeComment, unLikeComment } from '../../../redux/actions/commentAction'
import InputComment from '../InputComment'

const CommentCard = ({ children, comment, post, commentId }) => {
  console.log(comment)
  const [content, setContent] = useState('')
  const [readMore, setReadMore] = useState(false)
  
  const [onEdit, setOnEdit] = useState(false)
  const [isLike, setIsLike] = useState(false)
  const [loadLike, setLoadLike] = useState(false)
  const [onReply, setOnReply] = useState(false)
  
  const { auth, theme } = useSelector(state => state)
  const dispatch = useDispatch()
  
  useEffect(() => {
    setContent(comment.content)
    if (comment.likes.find(like => like._id === auth.user._id)) {
      setIsLike(true)
    }
  }, [comment, auth.user._id])

  const handleLike = async () => {
    if (loadLike) return;
    setIsLike(true)
    
    setLoadLike(true)
    await dispatch(likeComment({ comment, post, auth }))
    setLoadLike(false)
  }

  const handleUnLike = async () => {
    if (loadLike) return;
    setIsLike(false)

    setLoadLike(true)
    await dispatch(unLikeComment({ comment, post, auth }))
    setLoadLike(false)
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
  
  const handleReply = () => {
    if (onReply) return setOnReply(false)
    setOnReply({...comment, commentId })
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
                {
                  comment.tag && comment.tag._id !== comment.user._id &&
                  <Link to={`/profile/${comment.tag._id}`} >
                    @{comment.tag.username} &nbsp;
                  </Link>
                }
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
          <CommentMenu post={post} comment={comment} setOnEdit={setOnEdit}/>
          <LikeButton isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike} typeLike={false} />
          <small className="font-weight-bold ml-1">
          {comment.likes.length}
          </small>
        </div>
      </div>
      <div style={{cursor: 'pointer'}}>
        <small className="text-muted mr-3">
          {moment(comment.createdAt).fromNow()}
        </small>
        
        {
          onEdit
            ? <>
              <small className="font-weight-bold mr-3"
              onClick={handleUpdate}>
                  <i className="fas fa-retweet"/> update
                </small>
              <small className="font-weight-bold mr-3"
              onClick={e => setOnEdit(false)}>
                  <i className="fas fa-window-close"/> cancel
                </small>
            </>
            : <small className="font-weight-bold mr-3" onClick={handleReply}>
              {
                onReply ? 
                  <><i className="fas fa-window-close"/> cancel</>
                 : 
                  <><i className="fas fa-reply"/> reply</>
                
              }  
              </small>
        }
      </div>
      {
        onReply &&
        <InputComment post={post} onReply={onReply} setOnReply={setOnReply}>
          <Link to={`/profile/${onReply.user._id}`}>
            @{onReply.user.username}:
          </Link>
        </InputComment>
      }
      {children}
    </div>
  )
}

export default CommentCard
