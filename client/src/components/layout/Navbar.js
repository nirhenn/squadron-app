import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from './images/logo-en.png';

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center black-text">
              <i className="material-icons">code</i>
              <img src={logo} alt="dcompany logo" width="140" height="60" align="middle"/> 
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;