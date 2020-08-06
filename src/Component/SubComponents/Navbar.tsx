import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import pramoproLogo from "../../assets/pramopronavlogo.svg";
import "./shared.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import { API } from "../../config";
import { useState } from "react";
import SideNav from "react-simple-sidenav";

const NavBar = () => {
  const [user, setNewState] = useState("");
  const [showNav, setShowNav]: any = useState(false);
  const logOutMobile = (e) => {
    e.preventDefault();
    const details: any = localStorage.getItem("userDetails");
    const info = JSON.parse(details);
    var token = info.token;
    Axios.get(`${API}/logout`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        window.location.pathname = "/";
        localStorage.clear();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(() => {
    const details: any = localStorage.getItem("userDetails");
    const info = JSON.parse(details);
    setNewState(info?.user?.username);
    var token = info?.token;
  }, []);
  console.log(user);
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
          {!user && (
            <div className="n3wrapp">
              <div className="n3">
                <Link to="/signin">LOGIN</Link>
              </div>
              <div className="n4">
                <Link to="/signup">GET STARTED</Link>
              </div>
            </div>
          )}
          {user && (
            <div className="n3wrapp">
              <div className="n3">LOGOUT</div>
              <div className="n4">
                <Link to="/dashboard">DASHBOARD</Link>
              </div>
            </div>
          )}
          <div className="hamburgerwrap">
            <div
              className="hamburger"
              onClick={() => setShowNav(!showNav ? true : false)}
            >
              <div className="line1"></div>
              <div className="line2"></div>
              <div className="line3"></div>
            </div>
          </div>
        </div>
        {/* mobile nav starts here */}
        <SideNav
          showNav={showNav}
          style={{ background: showNav ? "rgba(0, 0, 0, 0.7)" : "none" }}
          navStyle={{ width: "70%", background: "#131313" }}
          onHideNav={() => setShowNav(false)}
          titleStyle={{
            backgroundColor: "#fff",
            color: "#444444",
            paddingLeft: 10,
            paddingBottom: 0,
            paddingTop: 0,
            fontSize: 17,
            textAlign: "left",
          }}
          title={[
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "18px 10px 18px 17px",
              }}
            >
              <img
                src={pramoproLogo}
                className="pramoproLogo"
                alt="pramopro-logo"
                height="40px"
              />
              <i className="fa fa-close" onClick={() => setShowNav(false)}></i>
            </div>,
          ]}
          itemStyle={{ backgroundColor: "#131313" }}
          items={[
            <div className="nav-section-mobile">
              <div className="nav-item-mobile">
                <Link className="menu-mobile-link" to="/">
                  Home
                </Link>
              </div>
              <div className="nav-item-mobile">
                <Link className="menu-mobile-link" to="/about">
                  About
                </Link>
              </div>
              <div className="nav-item-mobile">
                <Link className="menu-mobile-link" to="/products">
                  Products
                </Link>
              </div>
              <div className="nav-item-mobile">
                <Link className="menu-mobile-link" to="/contact">
                  Contact
                </Link>
              </div>
              <div className="dasjj">
                {!user && (
                  <div className="dashm2">
                    <a className="menu-mobile-link nav-btn1-2 dashboardmobile">
                      Login
                    </a>
                  </div>
                )}
              </div>
              {!user && (
                <div className="dashm2">
                  <Link
                    to="/dashboard"
                    className="menu-mobile-link nav-btn1-2 dashboardmobile"
                  >
                    GET STARTED
                  </Link>
                </div>
              )}
              <div className="dasjj">
                {user && (
                  <div className="dashm2">
                    <a className="menu-mobile-link nav-btn1-2 dashboardmobile">
                      LOGOUT
                    </a>
                  </div>
                )}
              </div>
              {user && (
                <div className="dashm2">
                  <Link
                    to="/dashboard"
                    className="menu-mobile-link nav-btn1-2 dashboardmobile"
                  >
                    DASHBOARD
                  </Link>
                </div>
              )}
            </div>,
          ]}
        />
        {/* mobile nav ends here */}
      </Navbar>
    </>
  );
};

export default NavBar;
