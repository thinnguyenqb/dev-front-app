import React from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import Search from "./Search";
import imageName from '../../images/logo-icon.png'
import { useSelector } from "react-redux";

const Image = props => {
  const { alt, ...otherProps } = props;
  return ( <img alt={alt} {...otherProps} />);
}

const Header = () => {
  const { theme } = useSelector(state => state)
  return (
    <div className="header bg-white" style={{
      display: "flex", justifyContent: "center",
      border: "1px solid rgba(0,0,0,.15)",
    }}>
      <nav className="navbar navbar-expand-lg navbar-light" style={{ maxWidth: '1260px'}}>
      <div className="col-md-2 p-0">
        <Link to="/" className="logo" >
          <div className="navbar-brand p-0 m-0" style={{filter: theme ? 'invert(1)' : 'invert(0)' }}
          onClick={() => window.scrollTo({top: 0})}>
            <Image alt="Logo" src={imageName} style={{ width: "50px"}} />
            <span style={{ fontSize: "19px", fontWeight: "600", color: "#200353"}}>Dev-Front</span>
          </div>
        </Link>
      </div>
      <div className="col-md-5 p-0">
        <Search />
      </div>
      <div className="col-md-5 px-0" style={{display: 'flex', justifyContent: 'flex-end'}}>
        <Menu />
      </div>
        
      </nav>
    </div>
  );
};

export default Header;


