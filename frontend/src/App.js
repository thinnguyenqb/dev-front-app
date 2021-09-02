import React, {useEffect} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PageRender from "./customRouter/PageRender";
import PrivateRouter from "./customRouter/PrivateRouter";

import Home from './pages/home'
import Login from './pages/login'
import Alert from './components/alert/Alert'
import Header from './components/header/Header'
import StatusModal from "./components/StatusModal";
import Register from './pages/register'

import { useSelector, useDispatch } from "react-redux"; 
import {refreshToken} from "./redux/actions/authAction"
import { getPosts } from "./redux/actions/postAction";
import { getSuggestions } from "./redux/actions/suggestionsAction";

import io from "socket.io-client"
import { GLOBALTYPES } from './redux/actions/globalTypes';
import SocketClient from "./socketClient";

const App = () => {
  const {auth, status, modal} = useSelector(state => state) // cần lấy ra auth để check
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())

    const socket = io()
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket })
    return () => socket.close()
  }, [dispatch])
  
  //Make sure the post is up to date
  useEffect(() => { 
    if (auth.token) {
      dispatch(getPosts(auth.token))
      dispatch(getSuggestions(auth.token))
    }
  }, [dispatch, auth.token])

  return (
    <Router>
      <Alert/>
      <input type="checkbox" id="theme"/>
      <div className={`App ${(status || modal) && 'mode'} bg-light`}>
        {auth.token && <Header/>} 
        <div className="main">
          {status && <StatusModal />}
          {auth.token && <SocketClient/>}
          <Route exact path="/" component={auth.token ? Home : Login} />
          <Route exact path="/register" component={Register} />
          
          <div className="wrap_page">
            <PrivateRouter exact path="/:page" component={PageRender} />
            <PrivateRouter exact path="/:page/:id" component={PageRender} />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
