import React from 'react'
import moment from 'moment'
import Avatar from '../../Avatar'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../../redux/actions/globalTypes'


const CardHeader = ({ post }) => {
  const { auth } = useSelector(state => state) 
  const dispatch = useDispatch()
  
  const handleEditPost = () => {
    console.log(post)
    dispatch({ type: GLOBALTYPES.STATUS, payload: {...post, onEdit: true}})
  }
  
  return (
    <div className="card_header">
      <div className="d-flex">
        <Avatar src={post.user.avatar} size={"big-avatar"} />
        
        <div className="card_name">
          <h6 className="m-0">
            <Link to={`/profile/${post.user._id}`} className="text-dark" >
              {post.user.username}
            </Link>
          </h6>

          <small className="text-muted">
            {moment(post.createAt).fromNow()}
          </small>
        </div>
      </div>
      <div className="nav-item dropdown">
        <span className="material-icons" id="moreLink" data-toggle="dropdown"> 
          more_horiz
        </span>
        <div className="dropdown-menu">
          {
            auth.user._id === post.user._id &&
            <>
              <div className="dropdown-item" onClick={handleEditPost}>
                <span className="material-icons-outlined">edit</span>Edit Post
              </div>
              <div className="dropdown-item">
                <span className="material-icons-outlined">delete_outline</span>Delete Post
              </div>
            </>
          }
          <div className="dropdown-item">
            <span className="material-icons-round">content_copy</span>Share Post
          </div>
          
        </div>

      </div>
    </div>
  )
}

export default CardHeader
