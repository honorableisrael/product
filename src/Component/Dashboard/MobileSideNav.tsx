import * as React from "react";
import "./Dashboard.css";
import "../SubComponents/shared.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import { API } from "../../config";
import { useState } from "react";
import SideNav from "react-simple-sidenav";
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
import Col from "react-bootstrap/Col";

const MobileSideNav = (props: any) => {
  const [user, setNewState] = useState("");
  const [showNav, setShowNav]: any = useState(false);
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
  React.useEffect(() => {
    const details: any = localStorage.getItem("userDetails");
    const info = JSON.parse(details);
    setNewState(info?.user?.username);
    var token = info?.token;
  }, []);
  console.log(user);
  return (
    <div className="csss11">
      <div
        className="sidebartoggle"
        onClick={() => setShowNav(!showNav ? true : false)}
      >
        <div className="lined1"></div>
        <div className="lined1"></div>
        <div className="lined1"></div>
      </div>
      <SideNav
        showNav={showNav}
        openFromRight={true}
        style={{ background: showNav ? "rgba(0, 0, 0, 0.7)" : "none" }}
        navStyle={{ width: "80%", background: "#fff" }}
        onHideNav={() => setShowNav(true)}
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
            <span className="timescode" onClick={() => setShowNav(false)}>
              &times;
            </span>
          </div>,
        ]}
        itemStyle={{ backgroundColor: "#fff",padding:0 }}
        items={[
          <div className="nav-section-mobile">
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
          </div>,
        ]}
      />
    </div>
  );
};

export default MobileSideNav;
