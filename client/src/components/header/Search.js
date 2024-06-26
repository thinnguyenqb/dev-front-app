import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDataAPI } from '../../utils/fetchData'
import {GLOBALTYPES} from '../../redux/actions/globalTypes'
import UserCard from '../UserCard'
import LoadIcon from '../../images/loading1.gif'
import { RiSearchLine, RiCloseLine } from "react-icons/ri";


const Search = () => {
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState([])

  const { auth } = useSelector(state => state)
  const dispatch = useDispatch()
  const [load, setLoad] = useState(false)

  useEffect(() => {
    if(search && auth.token){
      getDataAPI(`search?username=${search}`, auth.token)
      .then(res => setUsers(res.data.users))
      .catch(err => {
        dispatch ({
          type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg }
        })
      })
    }else{
      setUsers([])
    }
  } ,[search, auth.token, dispatch])

  const handleSearch = async(e) => {
    e.preventDefault()
    if(!search) return;
    try{
      const res = await getDataAPI(`search?username=${search}`, auth.token)
      setUsers(res.data.users)
      setLoad(false)
    }catch(err){
      dispatch({
        type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}
      })

    }

  }

  const handleClose = () => {
    setSearch('')
    setUsers([])
  }

  return (
    <form className='search_form' onSubmit={handleSearch}>
      <input type="text" name="search" value={search} id="search" className="bg-light"
      onChange={e => setSearch(e.target.value.toLowerCase().replace(/ /g, ''))}/>
      
      <div className="search_text" style={{opacity: search ? 0 : 0.5}}>
        <span>Search...</span>
        <div className="search_icon">
          <RiSearchLine size="1.5rem"/>
        </div>
      </div>

      <div className="close_search" style={{opacity: users.length === 0 ? 0 : 1}}
      onClick={handleClose}>
        <RiCloseLine />
      </div> 

      <button type="submit" style={{display: 'none'}}>Search</button>

      {load && <img className="loading" src={LoadIcon} alt="loading" />}

      <div className="users">
        {
          search && users.map(user => (
              <UserCard 
                key={user._id} 
                user={user} 
                border="border"
                handleClose={handleClose}
              />
          ))
        }
      </div>
    </form>
  )
}

export default Search
