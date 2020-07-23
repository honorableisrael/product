import * as React from "react";
import "./Dashboard.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import dashicon from "../../assets/dashboard.svg";
import money from "../../assets/money.svg";
import daterange from "../../assets/datedark.svg";
import activedaterange from "../../assets/activedaterange.svg";
import settings from "../../assets/settings.svg";
import power from "../../assets/power.svg";
import dasiconinactive from "../../assets/dashboard-icon.svg";
import subaccounts from "../../assets/subaccounts.svg";
import subaccountsactive from "../../assets/subaccountsactive.svg";
import activesettings from "../../assets/activesettings.svg";
import activemoney from "../../assets/activeproducts.svg";
import { Link } from "react-router-dom";
import Axios from "axios";
import { API } from "../../config";
import pramoproLogo from "../../assets/pramopronavlogo.svg";
import SideNav, { MenuIcon } from "react-simple-sidenav";

const SideBar = (props: any) => {
  const [user, setNewState] = React.useState("");
  const [showNav, setShowNav]: any = React.useState(true);
  const logOutMobile = (e) => {
    e.preventDefault();
    const details: any = localStorage.getItem("userDetails");
    const info = JSON.parse(details);
    var token = info.token;
    Axios.get(`${API}/api/v1/logout`, {
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
  return (
    <>
      <Col md={2} className="sidebar">
        <div className={props.dashboard ? "first12" : "inactiveside"}>
          <span>
            <Link to="/dashboard">
              <img
                src={props.dashboard ? dashicon : dasiconinactive}
                className="dashicon"
                alt="dashicon"
              />
            </Link>
          </span>
          <Link className="dashlinks" to="/dashboard">
            <span className="dash123">Dashboard</span>
          </Link>
        </div>
        <div className={props.products ? "first12" : "inactiveside"}>
          <span>
            <Link className="dashlinks" to="/dashboardproducts">
              <img
                src={props.products ? activemoney : money}
                className="dashicon"
                alt="dashicon"
              />
            </Link>
          </span>
          <Link className="dashlinks" to="/dashboardproducts">
            <span className="dash123">Products Traded</span>
          </Link>
        </div>
        <div className={props.history ? "first12" : "inactiveside"}>
          <span>
            <Link className="dashlinks" to="/dashboardhistory">
              <img
                src={props.history ? activedaterange : daterange}
                className="dashicon"
                alt="dashicon"
              />
            </Link>
          </span>
          <Link className="dashlinks" to="/dashboardhistory">
            <span className="dash123">History</span>
          </Link>
        </div>
        <div className={props.subaccounts ? "first12" : "inactiveside"}>
          <span>
            <Link className="dashlinks" to="/dashboardsubaccounts">
              <img
                src={props.subaccounts ? subaccountsactive : subaccounts}
                className="dashicon"
                alt="dashicon"
              />
            </Link>
          </span>
          <Link className="dashlinks" to="/dashboardsubaccounts">
            <span className="dash123">Sub Accounts</span>
          </Link>
        </div>
        <div className="seperate"></div>
        <div>
          <div className={props.settings ? "first12" : "inactiveside"}>
            <span>
              <Link className="dashlinks" to="/profilesettings">
                <img
                  src={props.settings ? activesettings : settings}
                  className="dashicon"
                  alt="dashicon"
                />
              </Link>
            </span>
            <Link className="dashlinks" to="/profilesettings">
              <span className="dash123">Settings</span>
            </Link>
          </div>
          <div className="inactiveside">
            <span>
              <img src={power} className="dashicon" alt="dashicon" />
            </span>
            <span className="dash123">Logout</span>
          </div>
        </div>
      </Col>
      <div></div>
      {/* <SideNav
        showNav={showNav}
        openFromRight={true}
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
        itemStyle={{ backgroundColor: "#fff" }}
        items={[
          <div className="nav-section-mobile">
            <Col md={2} className="sidebar">
              <div className={props.dashboard ? "first12" : "inactiveside"}>
                <span>
                  <Link to="/dashboard">
                    <img
                      src={props.dashboard ? dashicon : dasiconinactive}
                      className="dashicon"
                      alt="dashicon"
                    />
                  </Link>
                </span>
                <Link className="dashlinks" to="/dashboard">
                  <span className="dash123">Dashboard</span>
                </Link>
              </div>
              <div className={props.products ? "first12" : "inactiveside"}>
                <span>
                  <Link className="dashlinks" to="/dashboardproducts">
                    <img
                      src={props.products ? activemoney : money}
                      className="dashicon"
                      alt="dashicon"
                    />
                  </Link>
                </span>
                <Link className="dashlinks" to="/dashboardproducts">
                  <span className="dash123">Products Traded</span>
                </Link>
              </div>
              <div className={props.history ? "first12" : "inactiveside"}>
                <span>
                  <Link className="dashlinks" to="/dashboardhistory">
                    <img
                      src={props.history ? activedaterange : daterange}
                      className="dashicon"
                      alt="dashicon"
                    />
                  </Link>
                </span>
                <Link className="dashlinks" to="/dashboardhistory">
                  <span className="dash123">History</span>
                </Link>
              </div>
              <div className={props.subaccounts ? "first12" : "inactiveside"}>
                <span>
                  <Link className="dashlinks" to="/dashboardsubaccounts">
                    <img
                      src={props.subaccounts ? subaccountsactive : subaccounts}
                      className="dashicon"
                      alt="dashicon"
                    />
                  </Link>
                </span>
                <Link className="dashlinks" to="/dashboardsubaccounts">
                  <span className="dash123">Sub Accounts</span>
                </Link>
              </div>
              <div className="seperate"></div>
              <div>
                <div className={props.settings ? "first12" : "inactiveside"}>
                  <span>
                    <Link className="dashlinks" to="/profilesettings">
                      <img
                        src={props.settings ? activesettings : settings}
                        className="dashicon"
                        alt="dashicon"
                      />
                    </Link>
                  </span>
                  <Link className="dashlinks" to="/profilesettings">
                    <span className="dash123">Settings</span>
                  </Link>
                </div>
                <div className="inactiveside">
                  <span>
                    <img src={power} className="dashicon" alt="dashicon" />
                  </span>
                  <span className="dash123">Logout</span>
                </div>
              </div>
            </Col>
          </div>,
        ]}
      /> */}
    </>
  );
};
export default SideBar;
