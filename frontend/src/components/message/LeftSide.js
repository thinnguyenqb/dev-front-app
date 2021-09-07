import React, { useState } from 'react'
import UserCard from './../UserCard';
import { useSelector, useDispatch } from 'react-redux';
import { getDataAPI } from '../../utils/fetchData';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { useHistory } from 'react-router-dom';
import { addUser } from '../../redux/actions/messageAction';

const LeftSide = () => {
  const { auth, message } = useSelector(state => state)
  const dispatch = useDispatch()

  const [search, setSearch] = useState('')
  const [searchUsers, setSearchUsers] = useState([])
  const history = useHistory()

  const handleSearch = async(e) => {
    e.preventDefault()
    if(!search) return setSearchUsers([]);
    try{
      const res = await getDataAPI(`search?username=${search}`, auth.token)
      setSearchUsers(res.data.users)  
    }catch(err){
      dispatch({
        type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}
      })

    }
  }

  const handleAddUser = (user) => {
    setSearch('')
    setSearchUsers([])
    dispatch(addUser({ user, message }))
    return history.push(`/message/${user._id}`)
  }

  return (
    <>
      <div className="message_header" onClick={handleSearch}>
        <input type="text" value={search} placeholder="Enter to search ..."
          onChange={e => setSearch(e.target.value)} />
        <button type="submit" id="search">Search</button>
      </div>
      <div className="message_chat_list">
        {
          searchUsers.length !== 0
            ?
            <>
              {
                searchUsers.map(user => (
                  <div key={user._id} className="message_user"
                  onClick={() => handleAddUser(user)}>
                    <UserCard user={user}/>
                  </div>
                ))
              }
            </>
            :
            <>
              {/* <UserCard user={auth.user}/> */}
              {
                message.users.map(user => (
                  <div key={user._id} className="message_user"
                  onClick={() => handleAddUser(user)}>
                    <UserCard user={user}/>
                  </div>
                ))
              }
            </>
            
        }
      </div>
    </>
  )
}

export default LeftSide
