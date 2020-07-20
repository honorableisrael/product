import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import pramoproLogo from "../../assets/pramopronavlogo.svg";
import "./shared.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <Navbar className="navwrap" fixed="top">
        <div className="nwrapper">
          <div className="n1">
            <Link to="/">
              <img
                src={pramoproLogo}
                className="pramoproLogo"
                alt="pramoproLogo"
              />
            </Link>
          </div>
          <div className="n2wrapp">
            <div className="n2">
              <Link to="/">Home</Link>
            </div>
            <div className="n2">
              <Link to="/about">About</Link>
            </div>
            <div className="n2">
              <Link to="/products">Products</Link>
            </div>
            <div className="n2">
              <Link to="/contact">Contact</Link>
            </div>
          </div>
          <div className="n3wrapp">
            <div className="n3">
              <Link to="/signin">LOGIN</Link>
            </div>
            <div className="n4">
              <Link to="/signup">GET STARTED</Link>
            </div>
          </div>
        </div>
      </Navbar>
    </>
  );
};

export default NavBar;
