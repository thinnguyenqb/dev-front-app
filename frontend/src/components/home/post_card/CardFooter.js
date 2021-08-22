import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import LikeBotton from '../../LikeButton'

const CardFooter = ({ post }) => {
  const [isLike, setIsLike] = useState(false)
  const [loadLike, setLoadLike] = useState('')

  const handleLike = () => {
    setIsLike(true)
  }

  const handleUnLike = () => {
    setIsLike(false)
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
