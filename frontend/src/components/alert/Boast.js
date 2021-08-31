import React from "react";

const Toast = ({ msg, handleShow, bgColor }) => {
  return (
    <div
      className={`alert-box hidden toast show position-fixed text-light ${bgColor}`}
      style={{ top: "70px", right: "5px", minWidth: "300px", zIndex: 50 }}
    >
      <div className={`toast-header text-light ${bgColor}`}>

        {msg.title === "Success" ? (
          <i className="far fa-check-circle mr-2"/>
        ) : (
          <i className="fas fa-exclamation-triangle mr-2"/>
        )}

        <strong className="mr-auto text-light">{msg.title}</strong>
        <button
          className="ml-2 mb-1 close text-light"
          data-dismiss="toast"
          style={{ outline: "none", fontSize: '2rem' }}
          onClick={handleShow}
        >
          &times;
        </button>
      </div>
      <div className="toast-body">{msg.body}</div>
    </div>
  );
};

export default Toast;
