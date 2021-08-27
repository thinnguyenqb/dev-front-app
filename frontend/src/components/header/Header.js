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
    <div className="header bg-light" style={{ display:"flex", justifyContent:"center", border: "1px solid rgba(0,0,0,.15)"}}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
        <Link to="/" className="logo">
          <div className="navbar-brand p-0 m-0"
          onClick={() => window.scrollTo({top: 0})}>
            <Image alt="Logo" src={imageName} style={{ width: "50px", filter: theme ? 'invert(1)' : 'invert(0)' }} />
            <span style={{ fontWeight: "500", color: "#914cff"}}>KimQuy</span>
          </div>
        </Link>
        <Search />
        <Menu/>
      </nav>
    </div>
  );
};

export default Header;


