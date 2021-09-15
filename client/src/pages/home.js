import React from "react";

import Status from "../components/home/Status";
import Posts from "../components/home/Posts";
import LeftSideBar from '../components/home/left_side_bar/LeftSideBar'

import { useSelector } from 'react-redux';
import LoadIcon from '../images/loading1.gif'

function Home() {
  const {homePosts} = useSelector(state => state)
  return (
    <div className="home row mx-0">
      <div className="col-md-3 bg-light">
        <LeftSideBar />
      </div>
      <div className="col-md-6">
      <Status />
        {
          homePosts.loading
            ? <img src={LoadIcon} alt="loading" className="d-block mx-auto" width="80px"/>
            : (homePosts.result === 0 && homePosts.posts.length === 0)
              ? <h2 className="text-center">No Post</h2>
              : < Posts />
        }
      </div>

      <div className="col-md-3 bg-white">
       
      </div>
    </div>
  );
}

export default Home;
