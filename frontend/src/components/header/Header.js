import React from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import Search from "./Search";
import imageName  from '../../images/ig-logo.png'

const Image = props => {
  const { alt, ...otherProps } = props;
  return ( <img alt={alt} {...otherProps} />);
}

const Header = () => {
  return (
    <div className="header bg-light" style={{ display:"flex", justifyContent:"center", border: "1px solid rgba(0,0,0,.15)"}}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
        <Link to="/" className="logo">
          <div className="navbar-brand text-uppercase p-0 m-0"
          onClick={() => window.scrollTo({top: 0})}>
              <Image alt="Logo" src={imageName} width="150px" />
          </div>
        </Link>
        <Search />
        <Menu/>
      </nav>
    </div>
  );
};

export default Header;

// navbar-brand
