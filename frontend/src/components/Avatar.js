import React from "react";
import { useSelector } from "react-redux";

const Avatar = ({src} ) => {
  const { theme } = useSelector(state => state)
  return (
      <img
        src={src}
        alt="avatar"
        className="avatar"
        style={{ filter: `${theme ? "invert(90%)" : "invert(0)"}` }}
      />
  );
};

export default Avatar;
