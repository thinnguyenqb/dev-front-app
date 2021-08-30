import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import UserCard from '../UserCard'
import FollowBtn from './../FollowBtn';

import LoadIcon from "../../images/loading1.gif"
import { getSuggestions } from '../../redux/actions/suggestionsAction';

const LeftSideBar = () => {
  const { auth, suggestions } = useSelector(state => state)
  const dispatch = useDispatch()
  return (
    <div>
      {/* <UserCard user={auth.user} /> */}
      <div className="mt-3">
        <h5 className="text-black">DEV Community</h5>
        <ul>
          <li className="d-flex justify-content-flex-start align-items-center my-2">
            <i className="fas fa-laptop-house mr-5 ml-3"></i>
            <a href="/">Home</a>
          </li>
          <li className="d-flex justify-content-flex-start align-items-center my-2">
            <i className="fas fa-laptop-house mr-5 ml-3"></i>
            <a href="/">Danh sách đọc</a>
          </li>
          <li className="d-flex justify-content-flex-start align-items-center my-2">
            <i className="fas fa-laptop-house mr-5 ml-3"></i>
            <a href="/">Lập trình Frontend</a>
          </li>
          <li className="d-flex justify-content-flex-start align-items-center my-2">
            <i className="fas fa-laptop-house mr-5 ml-3"></i>
            <a href="/">Khóa học</a>
          </li>
          <li className="d-flex justify-content-flex-start align-items-center my-2">
            <i className="fas fa-laptop-house mr-5 ml-3"></i>
            <a href="/">Tip Frontend</a>
          </li>
          <li className="d-flex justify-content-flex-start align-items-center my-2">
            <i className="fas fa-laptop-house mr-5 ml-3"></i>
            <a href="/">Interview</a>
          </li>
          <li className="d-flex justify-content-flex-start align-items-center my-2">
            <i className="fas fa-laptop-house mr-5 ml-3"></i>
            <a href="/">Công cụ</a>
          </li>
          <li className="d-flex justify-content-flex-start align-items-center my-2">
            <i className="fas fa-laptop-house mr-5 ml-3"></i>
            <a href="/">Tài nguyên</a>
          </li>
          <li className="d-flex justify-content-flex-start align-items-center my-2">
            <i className="fas fa-laptop-house mr-5 ml-3"></i>
            <a href="/">Thư viện</a>
          </li>
          <li className="d-flex justify-content-flex-start align-items-center my-2">
            <i className="fas fa-laptop-house mr-5 ml-3"></i>
            <a href="/">Đàm đạo, tản mạn</a>
          </li>
        </ul>
      </div>

      <div className="mt-5">
        <h5 className="text-black">Other</h5>
        <ul>
          <li className="d-flex justify-content-flex-start align-items-center my-2">
            <i className="fas fa-laptop-house mr-5 ml-3"></i>
            <a href="/">Danh cho người mới</a>
          </li>
          <li className="d-flex justify-content-flex-start align-items-center my-2">
            <i className="fas fa-laptop-house mr-5 ml-3"></i>
            <a href="/">Điều khoản sử dụng</a>
          </li>
          <li className="d-flex justify-content-flex-start align-items-center my-2">
            <i className="fas fa-laptop-house mr-5 ml-3"></i>
            <a href="/">Chính sách bảo mật</a>
          </li>
          <li className="d-flex justify-content-flex-start align-items-center my-2">
            <i className="fas fa-laptop-house mr-5 ml-3"></i>
            <a href="/">Liên hệ</a>
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
