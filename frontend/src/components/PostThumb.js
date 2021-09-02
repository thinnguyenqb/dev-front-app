import React from "react";
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import { AiFillHeart, AiOutlineComment } from "react-icons/ai";


const PostThumb = ({ posts, result }) => {
  const { theme } = useSelector(state => state)
   
  if (result === 0) return <h2 className="text-center">No Post</h2>
  
  return (
    <div className="post_thumb">
      {
        posts.map(post => (
          <Link key={post._id} to={`/post/${post._id}`}>
            <div className="post_thumb_display">
              <img src={post.images[0].url} alt={post.images[0].url}
                style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
              />

              <div className="post_thumb_menu">
                <div className="pt_menu_item">
                  <AiFillHeart size="1.5rem" color="red"/>
                  <span>{post.likes.length}</span>
                </div>
                <div className="pt_menu_item">
                  <AiOutlineComment size="1.5rem" color="deepskyblue" />
                  <span>{post.comments.length}</span>
                </div>
              </div>
            </div>
          </Link>
        ))
      }
    </div>
  );
};

export default PostThumb;
