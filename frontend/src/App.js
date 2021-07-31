import { BrowserRouter as Router, Route } from "react-router-dom";
import PageRender from "./customRouter/PageRender";
import PrivateRouter from "./customRouter/PrivateRouter";

import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux"; 
import {refreshToken} from "./redux/actions/authAction"
import Alert from './components/alert/Alert'
import Header from './components/header/Header'

const App = () => {
  const {auth} = useSelector(state => state) // cần lấy ra auth để check
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())
  },[dispatch])


  return (
    <Router>
      <Alert/>
      <input type="checkbox" id="theme"/>
      <div className="App"> 
        {auth.token && <Header/>}
        <div className="main">
          <Route exact path="/" component={auth.token ? Home : Login} />
          <Route exact path="/register" component={Register} />
          
          <PrivateRouter exact path="/:page" component={PageRender} />
          <PrivateRouter exact path="/:page/:id" component={PageRender} />
        </div>
      </div>
    </Router>
  );
}

export default App;
