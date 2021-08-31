import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LikeButton from '../../LikeButton'
import { useSelector, useDispatch } from 'react-redux'
import { likePost, unLikePost, savePost, unSavePost } from '../../../redux/actions/postAction'
import ShareModal from '../../ShareModal'
import { BASE_URL } from '../../../utils/config'

const CardFooter = ({ post }) => {
  const [isLike, setIsLike] = useState(false)
  const [loadLike, setLoadLike] = useState(false)

  const [isShare, setIsShare] = useState(false)

  const { auth, theme } = useSelector(state => state)
  const dispatch = useDispatch()

  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (post.likes.find(like => like._id === auth.user._id)) {
      setIsLike(true)
    }  
  }, [post.likes, auth.user._id])

  const handleLike = async () => {
    if (loadLike) return;
    setIsLike(true)
    setLoadLike(true)
    await dispatch(likePost({ post, auth }))
    setLoadLike(false)
  }

  const handleUnLike = async () => {
    if (loadLike) return;
    setIsLike(false)
    setLoadLike(true)
    await dispatch(unLikePost({ post, auth }))
    setLoadLike(false)
  }

  useEffect(() => {
    if (auth.user.saved.find(id => id === post._id)) {
      setSaved(true)
    } else {
      setSaved(false)
    } 
  }, [auth.user.saved, post._id])

  return (
    <div className="card_footer">
      <div className="card_icon_menu">
        <div>
          <LikeButton isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
            typeLike={true}
          />

          <Link to={`/post/${post._id}`} className="text-dark">
            <i className="far fa-comment"/>
          </Link>
          
          <i className="far fa-paper-plane" onClick={() => setIsShare(!isShare)}></i>
        </div>
        {
          saved
            ? <i className="fas fa-bookmark bookmarktext-info" style={{ padding: '10px 12px' }}
              onClick={() => dispatch(unSavePost({ post, auth }))}
            />
            : <i className="far fa-bookmark bookmark" style={{ padding: '10px 12px' }}
              onClick={() => dispatch(savePost({ post, auth }))}
            />
        }
        
      </div>
      <div className="d-flex justify-content-between">
        <h6 style={{padding: '0 25px', cursor: 'pointer'}}>
          {post.likes.length} likes
        </h6>
        <h6 style={{padding: '0 25px', cursor: 'pointer'}}>
          {post.comments.length} comments
        </h6>
      </div>
      {
        isShare &&
        <ShareModal url={`${BASE_URL}/post/${post._id}`} theme={theme}/>
      }
    </div>
  )
}

export default CardFooter
