import React from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import Search from "./Search";

const Header = () => {
  return (
    <div className="header bg-light">
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light justify-content-around align-middle"
        style={{ border: "1px solid rgba(0,0,0,.15)"}}
      >
        <Link className="navbar-brand" to="/">
          Instagram
        </Link>
        <Search />
        <Menu/>
      </nav>
    </div>
  );
};

export default Header;
