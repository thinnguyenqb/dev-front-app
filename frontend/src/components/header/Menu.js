import React from 'react'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../../redux/actions/authAction';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import Avatar from "../Avatar";
import NotifyModal from '../NotifyModal'
import { RiHome5Line, RiCompassDiscoverLine, RiChatSmile2Line, RiNotification4Line } from "react-icons/ri";


const Menu = () => {
  const {auth, theme, notify} = useSelector(state => state)
  const dispatch = useDispatch()

  return (
    <div className="menu">
      <ul className="navbar-nav flex-row mr-auto">
        <li className="nav-item mr-2">
          <Link className="nav-link" to="/home">
            <RiHome5Line size="2rem"/>
          </Link>
        </li>
        <li className="nav-item mr-2">
          <Link className="nav-link" to="/discover">
            <RiCompassDiscoverLine size="2rem"/>
          </Link>
        </li>
        <li className="nav-item mr-2">
          <Link className="nav-link" to="/message">
            <RiChatSmile2Line size="2rem"/>
          </Link>
        </li>
        <li className="nav-item dropdown mr-2">
          <span className="nav-link" id="navbarDropdown"
          role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <RiNotification4Line size="2rem"/>
            <span className="notify-menu-label">{notify.data.length}</span>
          </span>
          <div className="dropdown-menu" aria-labelledby="navbarDrowdown" style={{transform:'translateX(40px)'}}>
            <NotifyModal />
          </div>
        </li>
        
        <li className="nav-item dropdown">
          <span
            className="nav-link"
            href="http://localhost:3000/"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <Avatar src={auth.user.avatar} size={"medium-avatar"}/>
          </span>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown" style={{transform:'translateX(50px)'}}>
            <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>
              <i className="fas fa-user pt-1 " style={{marginRight: "9px"}}/>
              Profile
            </Link>
            <label htmlFor="theme" className="dropdown-item"
              onClick={() => dispatch({type: GLOBALTYPES.THEME, payload: !theme
              })}
            >
              {theme ? <i className="far fa-moon mr-2 pt-1 "/> : <i className="fas fa-moon mr-2 pt-1 "/>}
              {theme ? "Light mode" : "Dark mode"}
            </label>

            <div className="dropdown-divider"></div>
              <Link className="dropdown-item" to={`/`}
              onClick={() => dispatch(logout())}>
                <i className="fas fa-sign-out-alt mr-2 pt-1"/>
                Logout
              </Link>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Menu
