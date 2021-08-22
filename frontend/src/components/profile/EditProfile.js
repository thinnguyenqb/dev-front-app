import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { checkImage } from '../../utils/imageUpload'
import { GLOBALTYPES } from './../../redux/actions/globalTypes';
import { updateProfileUser } from '../../redux/actions/profileAction';

const EditProfile = ({user, setOnEdit}) => {
  const initState = {
    fullname: '', mobile: '', address: '', website: '', story: '', gender: ''
  }
  const [userData, setUserData] = useState(initState)
  const { fullname, mobile, address, website, story } = userData
  
  const [avatar, setAvatar] = useState('')

  const { auth, theme } = useSelector(state => state)
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData(auth.user)
  }, [auth.user])
  
  const changeAvatar = (e) => {
    console.log('123')
    const file = e.target.files[0]
    const err = checkImage(file)
    if (err) return dispatch({
      type: GLOBALTYPES.ALERT, payload: { error: err }
    })
    setAvatar(file)
  }

  const handleInput = e => {
    const { name, value } = e.target
    setUserData({...userData, [name]: value})
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(updateProfileUser({userData, avatar, auth}))
}

  return (
    <div className="edit_profile">
      <form onSubmit={handleSubmit}>
        <div className="status_header">
          <h5>EditProfile</h5>
          <span onClick={() => setOnEdit(false)}>
            <i className="fas fa-times" style={{ fontSize: "20px" }}></i>
          </span>
        </div>
        <div className="info_avatar">
          <img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
            alt="avatar" style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
          <span>
            <i className="fas fa-camera" />
            <p>Change</p>
            <input type="file" name="file" id="file_up"
              accept="image/*" onChange={changeAvatar}
            />
          </span>
        </div>

        <div className="form_group">
          <label htmlFor="fullname"> Full Name</label>
          <div className="position-relative">
            <input type="text" className="form-control" id="fullname"
              name="fullname" value={fullname} onChange={handleInput} />
            
            <small className="text-danger position-absolute"
            style={{top:'50%', right:'5px', transform:'translateY(-50%)'}}>
              {fullname.length}/25
            </small>
          </div>
        </div>
        
        <div className="form_group">
          <label htmlFor="mobile">Mobile</label>
          <div className="position-relative">
            <input type="text" className="form-control" id="mobile"
              name="mobile" value={mobile} onChange={handleInput} />
            
            <small className="text-danger position-absolute"
            style={{top:'50%', right:'5px', transform:'translateY(-50%)'}}>
              {mobile.length}/25
            </small>
          </div>
        </div>
        
        <div className="form_group">
          <label htmlFor="address">Address</label>
          <div className="position-relative">
            <input type="text" className="form-control" id="address"
              name="address" value={address} onChange={handleInput} />
            
            <small className="text-danger position-absolute"
            style={{top:'50%', right:'5px', transform:'translateY(-50%)'}}>
              {address.length}/25
            </small>
          </div>
        </div>
        
        <div className="form_group">
          <label htmlFor="website">Website</label>
          <div className="position-relative">
            <input type="text" className="form-control" id="website"
              name="website" value={website} onChange={handleInput} />
            
            <small className="text-danger position-absolute"
            style={{top:'50%', right:'5px', transform:'translateY(-50%)'}}>
              {website.length}/25
            </small>
          </div>
        </div>
        
        <div className="form_group">
          <label htmlFor="story">Story</label>
          <div className="position-relative">
            <textarea type="text" className="form-control" id="story"
              name="story" value={story} onChange={handleInput} cols="30" rows="4"/>
            
            <small className="text-danger position-absolute"
            style={{top:'50%', right:'5px', transform:'translateY(-50%)'}}>
              {story.length}/300
            </small>
          </div>
        </div>

        <div className="form_group">
          <label htmlFor="gender">Gender</label>
          <div className="input-group-prepend px-0 mb-4">
            <select className="custom-select text-capitalize" id="gender" name="gender"
              onChange={handleInput}
            >
              <option value="male">Male</option>    
              <option value="female">Female</option>    
              <option value="other">Other</option>    
            </select>
          </div>
        </div>

        <button className="btn btn-more w-100" type="submit"
          style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
        >
          Save
        </button>
        
      </form>
    </div>
  )
}

export default EditProfile
