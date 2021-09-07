import React from 'react'
import LeftSide from '../../components/message/LeftSide'
import { RiMessengerLine } from "react-icons/ri";



const Message = () => {
  return (
    <div className="message d-flex">
      <div className="col-md-4 border-right px-0">
        <LeftSide />
      </div>
      <div className="col-md-8 px-0">
        <div className="d-flex justify-content-center 
          align-items-center flex-column h-100">
            <RiMessengerLine size="5rem" color="blueviolet"/>
            <h4>Messenger</h4>
        </div>
      </div>
    </div>
  )
}

export default Message
