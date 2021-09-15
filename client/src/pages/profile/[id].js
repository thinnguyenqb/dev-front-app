import React, { useState, useEffect } from 'react'
import Info from '../../components/profile/Info'
import Posts from '../../components/profile/Posts'
import Saved from '../../components/profile/Saved'
import { useSelector, useDispatch } from 'react-redux'
import LoadIcon from '../../images/loading1.gif'
import { getProfileUsers } from '../../redux/actions/profileAction'
import { useParams } from 'react-router-dom'

const Profile = () => {
  const { profile, auth } = useSelector(state => state)
  const dispatch = useDispatch()

  const { id } = useParams()
  const [saveTab, setSaveTab] = useState(false)
  
  useEffect(() => {
    if (profile.ids.every(item => item !== id)) {
      dispatch(getProfileUsers({id, auth}))
    }
  }, [id, auth, dispatch, profile.ids])

  return (
    <div className="profile">
      <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />
      <div className="profile-body">
        <div className="col-md-2">
          {
            auth.user._id === id &&
            <div className="profile_tab">
              <button className={saveTab ? '' : 'active'} onClick={() => setSaveTab(false)}>Posts</button>
              <button className={saveTab ? 'active' : ''} onClick={() => setSaveTab(true)}>Saved</button>
            </div>
          }
        </div>
        <div className="col-md-10">
          {
            profile.loading
              ? <img className="d-block mx-auto my-4" src={LoadIcon} alt="loading" />
              : <>
                {
                  saveTab
                    ? <Saved auth={auth} dispatch={dispatch}/>
                    : <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
                }
              </>
          }
        </div>
      </div>
    </div>
  )
}

export default Profile
