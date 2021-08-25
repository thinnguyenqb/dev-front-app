import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../../redux/actions/authAction';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import Avatar from "../Avatar";


const Menu = () => {
  const navLinks = [
    { label: "Home", icon: "cottage", path: "/"},
    { label: "Message", icon: "near_me", path: "/message" },
    { label: "Discover", icon: "explore", path: "/discover" },
    { label: "Notify", icon: "favorite_border", path: "/notify" },
  ];

  const {auth, theme} = useSelector(state => state)
  const dispatch = useDispatch()
  const {pathname} = useLocation() //hook get pathname current

  //handle active page-logo in header
  const isActive = (pn) => {
    if(pn === pathname) return 'active'
  }

  return (
    <div className="menu">
      <ul className="navbar-nav flex-row mr-auto">
        {navLinks.map((link, index) => (
          <li className={`nav-item px-1 ${isActive(link.path)}`} key={index}>
            <Link className="nav-link" to={link.path}>
              <span className="material-icons-outlined d-flex align-items-center">
                {link.icon}
              </span>
            </Link>
          </li>
        ))}
        <li className="nav-item dropdown">
          <span
            className="nav-link dropdown-toggle"
            href="http://localhost:3000/"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <Avatar src={auth.user.avatar} size={"medium-avatar"}/>
          </span>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
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
