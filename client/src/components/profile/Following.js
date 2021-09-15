import React from 'react'
import FollowBtn from '../FollowBtn';
import UserCard from './../UserCard';
import { useSelector } from 'react-redux'

const Following = ({ users, setShowFollowing }) => {
  const { auth } = useSelector(state => state)
  return (
    <div className="follow">
      <div className="follow_box">
        <h5>Following</h5>
        <hr />
        <div className="follow_content">
          {
            users.map(user => (
              <UserCard key={user._id} user={user} setShowFollowing={setShowFollowing}>
                {
                  auth.user._id !== user._id && <FollowBtn user={user} />
                }
              </UserCard>
            ))
          }
          <div className="close" onClick={() => setShowFollowing(false)}>
            &times;
          </div>
        </div>
      </div>
    </div>
  )
}

export default Following
