import React, { useState } from "react";
import Logo from '../images/logo-icon.png'
import { Link } from "react-router-dom";
import { login } from '../redux/actions/authAction'
import { useDispatch } from "react-redux";

const Login = () => {
  const initialState = { 
    email: "", 
    password: "" 
  };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const [typePass, setTypePass] = useState(false)

  //const { auth } = useSelector(state => state)
  const dispatch = useDispatch()
  //const history = useHistory()

  const Image = props => {
    const { alt, ...otherProps } = props;
    return ( <img alt={alt} {...otherProps} />);
  }

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // console.log(userData)
    dispatch(login(userData))
  }

  return (
    <div className="auth_page">
      <form className="login_form" onSubmit={handleSubmit}>
        <Image alt="Logo" src={Logo} className="logo-icon show"/>
        <h3 className="text-center mb-4">Welcome back.</h3>
        <div className="form-group">
          <i className="fas fa-envelope text-muted mr-2"/>
          <label htmlFor="exampleInputEmail1" className="font-weight-text text-muted">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            aria-describedby="emailHelp"
            onChange={handleChangeInput}
            value={email}
            placeholder="user@gmail.com"
          />
        </div>
        <div className="form-group">
          <i className="fas fa-lock text-muted mr-2"/>
          <label htmlFor="exampleInputPassword1" className="font-weight-text text-muted">Password</label>
          <div className="pass">
            <input
              type={typePass? "text":"password"}
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleChangeInput}
              value={password}
              name="password"
              placeholder="******"
            />
            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? <i className="far fa-eye-slash"/> : <i className="far fa-eye"/>}
            </small>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-dark w-100 btn-grad"
          disabled={email && password ? false : true}
        >
          Log in to your account
        </button>
        <p className="my-2 font-weight-text text-muted" style={{display: "flex", justifyContent:"center"}}>
          Just getting started? &nbsp;
          <Link to="/register" style={{ color: "#512bdc", fontWeight: "500" }}>
            Register Now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
