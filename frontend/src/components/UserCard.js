import React from 'react'
import Avatar from './Avatar'
import { Link } from 'react-router-dom'

const UserCard = ({children, user, border, handleClose, setShowFollowers, setShowFollowing}) => {
  const handleCloseAll = () => {
    if (handleClose) handleClose()
    if (setShowFollowers) setShowFollowers(false)
    if (setShowFollowing) setShowFollowing(false)
  }
  return (
    <div className={`d-flex p-2 align-item-center justify-content-between w-100 ${border}`}>
      <div>
        <Link to={`/profile/${user._id}`} onClick={handleCloseAll} className="d-flex align-item-center">
          <Avatar src={user.avatar} size="big-avatar"/>
          <div className="ml-1" style={{transform: 'translateY(-1px) translateX(6px)'}}>
            <span className="d-block pt-1" style={{ fontWeight: '500', color: "#200353" }}>{user.username}</span>
            <small style={{ opacity: 0.7, fontWeight: '500', color: "#200353" }}>
              {
                user.text || user.media
                  ?
                  <>
                    <div>{user.text}</div>
                    {
                      user.media.length > 0 &&
                      <div>
                        {user.media.length} <i className="fas fa-image" />
                      </div>
                    }
                  </>
                  : user.fullname
              }
            </small>
          </div>
        </Link>
      </div>
      {children}
    </div>
  )
}

export default UserCard
