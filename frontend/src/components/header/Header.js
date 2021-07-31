import React from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";

const Header = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light justify-content-around align-middle"
      style={{ border: "1px solid rgba(0,0,0,.15)"}}
    >
      <Link className="navbar-brand" to="/">
        Instagram
      </Link>
      <Menu/>
    </nav>
  );
};

export default Header;
