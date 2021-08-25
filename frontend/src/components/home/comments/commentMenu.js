import React from 'react'

const commentMenu = ({ post, comment, auth, setOnEdit }) => {
  const MenuItem = () => {
    return (
      <>
        <div className="dropdown-item" onClick={() => {setOnEdit(true)}}>
          <span className="material-icons-outlined">edit</span> Edit
        </div>
        <div className="dropdown-item">                   
          <span className="material-icons">delete_outline</span> Remove
        </div>
      </>
    )
  }
  return (
    <div>
    {
      (post.user._id === auth.user._id || comment.user._id === auth.user._id) &&
      <div className="nav-item dropdown">
        <span className="material-icons" id="moreLink" data-toggle="dropdown" style={{}}>
          more_vert
          </span>
        <div className="dropdown-menu" aria-labelledby="moreLink">
          {
            post.user._id === auth.user._id
              ? comment.user._id === auth.user._id
                ? MenuItem()
                : <div className="dropdown-item">
                  <span className="material-icons">delete_outline</span> Remove
                  </div>
              : comment.user._id === auth.user._id && MenuItem()
          }
        </div>
      </div>
    }
    </div>
    
  )
}

export default commentMenu
