import React from "react";
import { useSelector } from "react-redux";

const LikeButton = ({ isLike, handleLike, handleUnLike, typeLike }) => {
  const { theme } = useSelector(state => state)
  return (
    <>
      {
        typeLike ?
          (
            isLike ? (
              <i
                className="fas fa-heart"
                style={{ color: "red", filter: theme ? 'invert(1)' : 'invert(0)'}}
                onClick={handleUnLike}
              />
            ) : (
              <i className="far fa-heart" onClick={handleLike} />
            )
          )
          :
          (
            isLike ? (
              <i
                className="fas fa-thumbs-up"
                style={{ color: "blueviolet", filter: theme ? 'invert(1)' : 'invert(0)'}}
                onClick={handleUnLike}
              />
            ) : (
                <i className="far fa-thumbs-up" onClick={handleLike} />
            )
          )
      }
    </>
  );
};

export default LikeButton;


