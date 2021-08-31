import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import UserCard from '../../UserCard'
import FollowBtn from '../../FollowBtn';

import LoadIcon from "../../../images/loading1.gif"
import { getSuggestions } from '../../../redux/actions/suggestionsAction';

import {
  FcHome, FcReadingEbook, FcSmartphoneTablet,
  FcGraduationCap, FcVoicePresentation
} from "react-icons/fc";

const LeftSideBar = () => {
  const { auth, suggestions } = useSelector(state => state)
  const dispatch = useDispatch()
  return (
    <div>
      <div className="sidebar-items mt-3 ">
        <h5 className="text-black">DEV Community</h5>
        <ul>
          <li className="d-flex justify-content-flex-start align-items-center">
            <FcHome className="menu-bars-icon mr-4 ml-3"/> 
            <a href="/">Home</a>
          </li>
          <li className="d-flex justify-content-flex-start align-items-center">
            <FcReadingEbook className="menu-bars-icon mr-4 ml-3"/> 
            <a href="/">Danh sách đọc</a>
          </li>
          <li className="d-flex justify-content-flex-start align-items-center">
            <FcSmartphoneTablet className="menu-bars-icon mr-4 ml-3"/> 
            <a href="/">Lập trình Frontend</a>
          </li>
          <li className="d-flex justify-content-flex-start align-items-center">
            <FcGraduationCap className="menu-bars-icon mr-4 ml-3"/> 
            <a href="/">Khóa học</a>
          </li>
          <li className="d-flex justify-content-flex-start align-items-center">
            <FcVoicePresentation className="menu-bars-icon mr-4 ml-3"/> 
            <a href="/">Đàm đạo, tản mạn</a>
          </li>
        </ul>
      </div>

      <div className="sidebar-items mt-3 ">
        <h5 className="text-black">Other</h5>
        <ul>
          <li className="d-flex justify-content-flex-start align-items-center">
            <a href="/" className="pl-3">Danh cho người mới</a>
          </li>
          <li className="d-flex justify-content-flex-start align-items-center">
            <a href="/" className="pl-3">Điều khoản sử dụng</a>
          </li>
          <li className="d-flex justify-content-flex-start align-items-center">
            <a href="/" className="pl-3">Chính sách bảo mật</a>
          </li>
          <li className="d-flex justify-content-flex-start align-items-center">
            <a href="/" className="pl-3">Liên hệ</a>
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
