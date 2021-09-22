import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import UserCard from '../../UserCard'
import FollowBtn from '../../FollowBtn';

import LoadIcon from "../../../images/loading1.gif"
import { getSuggestions } from '../../../redux/actions/suggestionsAction';

import {
  RiBookReadFill, RiSlideshow3Line, RiWechatFill, RiHandCoinLine, RiTerminalBoxFill
} from "react-icons/ri";
import { FiShoppingBag } from "react-icons/fi";
import { HiOutlineEmojiHappy } from "react-icons/hi";

const LeftSideBar = () => {
  const { auth, suggestions } = useSelector(state => state)
  const dispatch = useDispatch()
  return (
    <div>
      <div className="sidebar-items mt-3 ">
        <h5 className="text-black">DEV Community</h5>
        <ul>
          <li className="d-flex justify-content-flex-start align-items-center">
            <RiBookReadFill className="menu-bars-icon mr-2 ml-2"/> 
            <a href="/feature">Danh sách đọc</a>
          </li>
          <li className="d-flex justify-content-flex-start align-items-center">
            <RiSlideshow3Line className="menu-bars-icon mr-2 ml-2"/> 
            <a href="/feature">Khóa học</a>
          </li>
          <li className="d-flex justify-content-flex-start align-items-center">
            <FiShoppingBag className="menu-bars-icon mr-2 ml-2"/> 
            <a href="https://shop-dev-front.herokuapp.com/">DEV Shop</a>
          </li>
          <li className="d-flex justify-content-flex-start align-items-center">
            <RiWechatFill className="menu-bars-icon mr-2 ml-2"/> 
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </div>

      <div className="sidebar-items mt-3 ">
        <h5 className="text-black">Other</h5>
        <ul>
          <li className="d-flex justify-content-flex-start align-items-center">
            <RiHandCoinLine className="menu-bars-icon mr-2 ml-2"/> 
            <a href="/content">Code of Conduct</a>
          </li>
          <li className="d-flex justify-content-flex-start align-items-center">
            <HiOutlineEmojiHappy className="menu-bars-icon mr-2 ml-2"/> 
            <a href="/content">Privacy Policy</a>
          </li>
          <li className="d-flex justify-content-flex-start align-items-center">
            <RiTerminalBoxFill className="menu-bars-icon mr-2 ml-2"/> 
            <a href="/content">Terms of use</a>
          </li>
          
        </ul>
      </div>

      <div className="d-flex justify-content-between align-items-center my-5">
        <h5 className="text-black">Suggestions for you</h5>
        {
          !suggestions.loading &&
          <i className="fas fa-redo" style={{ cursor: 'pointer' }}
            onClick={() => dispatch(getSuggestions(auth.token))}
          />
        }
      </div>

      {
        suggestions.loading
          ? <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" style={{ width: '100px' }}/>
          : <div className="suggestions">
            {
              suggestions.users.map(user => (
                <UserCard key={user._id} user={user}>
                  <FollowBtn user={user}/>
                </UserCard>
              ))
            }
          </div>
      }
    </div>
  )
}

export default LeftSideBar
