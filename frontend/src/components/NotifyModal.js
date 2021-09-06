import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RiMessage3Line, RiDeleteBin4Line, RiVolumeUpLine, RiVolumeMuteLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import moment from 'moment';
import { isReadNotify } from '../redux/actions/notifyAction';

const NotifyModal = () => {
  const { auth, notify } = useSelector(state => state)
  const dispatch = useDispatch()

  const handleIsRead = (msg) => {
    dispatch(isReadNotify({msg, auth}))
  }

  return (
    <div style={{ minWidth: '330px'}}>
      <div className="notify-header px-3 py-2">
        <h4 style={{margin:'auto 0px'}}>Thông báo</h4>
        <div className="notify-header-feature">
          {
            <div className="notify-feature-item">
              <RiDeleteBin4Line size='1.5rem'/>
            </div>
          }
          <div className="notify-feature-item ml-3">
            {
            notify.sound
              ? <RiVolumeUpLine size='1.5rem'/>
              : <RiVolumeMuteLine size='1.5rem'/>
            }
          </div>
        </div>
      </div>
      <div>
        <div className="notify-filter px-3 pb-3">
          <span>Tất cả</span>
          <span>Thích</span>
          <span>Bình luận</span>
          <span>@Tag</span>
        </div>
      </div>
      <div>
        {
          notify.data.length === 0 &&
          <div className="notify-empty">
            <RiMessage3Line size="80px" color="gainsboro"/>
            <span>Các thông báo về tài khoản của bạn sẽ xuất hiện tại đây.</span>
          </div>
        }
      </div>

      <div className="mx-3" style={{ maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }}>
        {
          notify.data.map((msg, index) => (
            <div key={index} className="px-2 mb-3">
              <Link to={`${msg.url}`} className="d-flex text-dark align-items-center"
              onClick={() => handleIsRead(msg)}>
                <Avatar src={msg.user.avatar} size="medium-avatar"/>

                <div className="mx-2 flex-fill">
                  <div>
                    <strong className="mr-1">{msg.user.username}</strong>
                    <span>{msg.text}</span>
                  </div>
                    {msg.content && <small>{msg.content.slice(0,20)}...</small>}
                  </div>
                  <div style={{width:'25px'}}>
                    {msg.image && <Avatar src={msg.image} size='medium-avatar'/>}
                </div>
              </Link>
              <small className="notify-items-time text-muted">
                {moment(msg.createdAt).fromNow()}
                {
                  !msg.isRead ?
                    <span>Chưa xem</span>
                  :
                    <span>Đã xem</span>
                }

              </small>
            </div>

          ))
        }

      </div>
    </div>
  )
}

export default NotifyModal
