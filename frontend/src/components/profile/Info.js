import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Avatar from '../Avatar'
import {getProfileUsers} from '../../redux/actions/profileAction'

const Info = () => {
  const {id} = useParams()
  const {auth, profile} = useSelector(state => state)
  const dispatch = useDispatch()

  const [userData, setUserData] = useState([])

  useEffect(() => {
    if(id === auth.user._id){
      setUserData([auth.user]) //redux
    }else{
      dispatch(getProfileUsers({users: profile.users, id, auth}))
      const newData = profile.users.filter(user => user._id === id) 
      setUserData(newData)
    }
  }, [id, auth, dispatch, profile.users])

  return (
    <div className="info">
      {
        userData.map(user => (
          <div className="info_container" key={user._id}>
            <Avatar src={user.avatar} size="supper-avatar"/>
            <div className="info_content">
              <div className="info_content_title">
                <h2>{user.username}</h2>
                <button className="btn btn-outline-info">
                  Edit Profile
                </button>
              </div>
              <div>
                <span>{user.followers.length} Followers</span>
              </div>
              <div>
                <span>{user.following.length} Following</span>
              </div>
              <h6>{user.fullname}</h6>
              <p>{user.address}</p>
              <h6>{user.email}</h6>
              <a href={user.website} target="_blank" rel="noreferrer">
                {user.website}
              </a>
              <p>{user.story}</p>

            </div> 
          </div>
        ))
      }
    </div>
  )
}

export default Info