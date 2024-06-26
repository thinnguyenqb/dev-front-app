import React from "react";
import Avatar from "../Avatar";
import { imageShow, videoShow } from "../../utils/mediaShow";

const MsgDisplay = ({ user, msg, theme, styleCSS }) => {
  return (
    <div className="d-flex">
      {
        styleCSS ? (
        <>
          <div className="chat_title_tooltip">
            <Avatar src={user.avatar} size="medium-avatar" />
            <span className="chat_title_tooltiptext">{user.username}</span>
          </div>

          <div className="chat_content">
            {msg.text && (
              <div
                className="chat_text"
                style={{ filter: theme ? "invert(1)" : "invert(0)" }}
              >
                {msg.text}
              </div>
            )}
            {msg.media.map((item, index) => (
              <div key={index}>
                {item.url.match(/video/i)
                  ? videoShow(item.url, theme)
                  : imageShow(item.url, theme)}
              </div>
            ))}
            <div className="chat_time">
              {new Date(msg.createdAt).toLocaleString()}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="chat_content">
            {msg.text && (
              <div
                className="chat_text"
                style={{ filter: theme ? "invert(1)" : "invert(0)" }}
              >
                {msg.text}
              </div>
            )}
            {msg.media.map((item, index) => (
              <div key={index}>
                {item.url.match(/video/i)
                  ? videoShow(item.url, theme)
                  : imageShow(item.url, theme)}
              </div>
            ))}
            <div className="chat_time">
              {new Date(msg.createdAt).toLocaleString()}
            </div>
          </div>
          <div className="chat_title_tooltip">
            <Avatar src={user.avatar} size="medium-avatar" />
            <span className="chat_title_tooltiptext">{user.username}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default MsgDisplay;
