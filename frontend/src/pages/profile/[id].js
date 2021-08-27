import React from 'react'
import Info from '../../components/profile/Info'
import Posts from '../../components/profile/Posts'
import { useSelector } from 'react-redux'
import LoadIcon from '../../images/loading1.gif'

const Profile = () => {
  const { profile } = useSelector(state => state)
  return (
    <div className="profile">
      {
        profile.loading ? <img src={LoadIcon} alt="loading"/> : <Info />
      }
      <Posts />

      <h1>Profile</h1>
    </div>
  )
}

export default Profile
