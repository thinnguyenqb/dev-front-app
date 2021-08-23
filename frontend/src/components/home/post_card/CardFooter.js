import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LikeBotton from '../../LikeButton'
import { useSelector, useDispatch } from 'react-redux'
import { likePost } from '../../../redux/actions/postAction'
import { unLikePost } from '../../../redux/actions/postAction'

const CardFooter = ({ post }) => {
  const [isLike, setIsLike] = useState(false)
  const [loadLike, setLoadLike] = useState(false)

  const { auth } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    if (post.likes.find(like => like._id === auth.user._id)) {
      setIsLike(true)
    }  
  }, [post.likes, auth.user._id])

  const handleLike = async () => {
    if (loadLike) return;
    setIsLike(true)
    console.log(loadLike + "a")
    setLoadLike(true)
    console.log(loadLike + "b")
    await dispatch(likePost({ post, auth }))
    console.log(loadLike + "c")
    setLoadLike(false)
    console.log(loadLike + "d")
  }

  const handleUnLike = async () => {
    if (loadLike) return;
    setIsLike(false)
    console.log(loadLike + "1")
    setLoadLike(true)
    console.log(loadLike + "2")
    await dispatch(unLikePost({ post, auth }))
    console.log(loadLike + "3")
    setLoadLike(false)
    console.log(loadLike + "4")
    
  }

  return (
    <div className="card_footer">
      <div className="card_icon_menu">
        <div>
          <LikeBotton isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />

          <Link to={`/post/${post._id}`} className="text-dark">
            <i className="far fa-comment"/>
          </Link>
          
          <i className="far fa-paper-plane"></i>
        </div>
        <i className="far fa-bookmark bookmark" style={{ padding: '10px 12px' }}/>
      </div>
      <div className="d-flex justify-content-between">
        <h6 style={{padding: '0 25px', cursor: 'pointer'}}>
          {post.likes.length} likes
        </h6>
        <h6 style={{padding: '0 25px', cursor: 'pointer'}}>
          {post.comment.length} comments
        </h6>
      </div>
    </div>
  )
}

export default CardFooter
