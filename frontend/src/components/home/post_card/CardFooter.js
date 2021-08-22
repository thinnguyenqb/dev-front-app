import React from 'react'
import { Link } from 'react-router-dom'

const CardFooter = ({post}) => {
  return (
    <div className="card_footer">
      <div className="card_icon_menu">
        <div>
          <i className="fas fa-heart" />

          <Link to={`/post/${post._id}`} className="text-dark">
            <i className="far fa-comment"/>
          </Link>
          
          <i className="far fa-paper-plane"></i>
        </div>
        <i className="far fa-bookmark bookmark"/>
      </div>
      <div className="d-flex justify-content-between">
        <h6 style={{padding: '0 39px', cursor: 'pointer'}}>
          {post.likes.length}
        </h6>
        <h6 style={{padding: '0 25px', cursor: 'pointer'}}>
          {post.comment.length} comments
        </h6>
      </div>
    </div>
  )
}

export default CardFooter
