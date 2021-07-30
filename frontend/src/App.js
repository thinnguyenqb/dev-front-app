import { BrowserRouter as Router, Route } from "react-router-dom";
import PageRender from "./PageRender";
import Home from './pages/Home'
import Login from './pages/Login'
import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux"; 
import {refreshToken} from "./redux/actions/authAction"
import Alert from './components/alert/Alert'

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
        <div className="main">
          <Route exact path="/" component={auth.token ? Home : Login} />
          <Route exact path="/:page" component={PageRender} />
          <Route exact path="/:page/:id" component={PageRender} />
        </div>
      </div>
    </Router>
  );
}

export default App;
