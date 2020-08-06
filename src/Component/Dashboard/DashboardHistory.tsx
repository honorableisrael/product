import * as React from "react";
import NavBar from "../SubComponents/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Dashboard.css";
import SideBar from "./sidebar";
import RightSideBar from "./rightSideBar";
import arrowleft from "../../assets/navigate_next.svg";
import MobileSideNav from "./MobileSideNav";
import Axios from "axios";
import { API } from "../../config";
import { useState } from "react";

const DashboardHistory = (props: any) => {
  const [state, setFormState] = useState({
    show: false,
    subject: "",
    message: "",
    errorMessage: "",
    user: {},
    isloading: false,
  });
  React.useEffect(() => {
    const loggedIn = localStorage.getItem("userDetails");
    const userdata = loggedIn ? JSON.parse(loggedIn) : "";
    const token = loggedIn ? JSON.parse(loggedIn).token : "";
    Axios.get(`${API}/user/history`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log(res);
        setFormState({
          ...state,
          user: res.data.data,
        });
      })
      .catch((err) => {
        if (err?.status === 401) {
          props.history.push("/signin");
        }
        console.log(err);
      });
  }, []);
  return (
    <>
      <NavBar />
      <Container fluid={true} className="push">
        <Row className="dashrow">
          <SideBar history={true} />
          <Col md={10} className="mainbody11">
            <Row className="rowss">
              <MobileSideNav />
              <Col md={8} className="prodcu">
                <div className="historywrap">
                  <div>History</div>
                  <div className="midwrap">
                    <span>
                      <img
                        src={arrowleft}
                        className="arrowleft"
                        alt="arrowright"
                      />
                    </span>
                    <span>March</span>
                    <span>
                      <img
                        src={arrowleft}
                        className="arrowright"
                        alt="arrowleft"
                      />
                    </span>
                  </div>
                </div>
                <div className="historywrap1">
                  <div className="datedata">
                    <div className="days">Mon</div>
                    <div className="numberday">20</div>
                  </div>
                  <div>
                    <div className="accountaction">Account Created</div>
                    <div className="accountaction2">
                      You created your account via email
                    </div>
                  </div>
                  <div className="actiontime">11:24:23 am</div>
                </div>
                <div className="historywrap1">
                  <div className="datedata">
                    <div className="days">Mon</div>
                    <div className="numberday">20</div>
                  </div>
                  <div>
                    <div className="accountaction">Account Created</div>
                    <div className="accountaction2">
                      You created your account via email
                    </div>
                  </div>
                  <div className="actiontime">11:24:23 am</div>
                </div>
              </Col>
              <RightSideBar />
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default DashboardHistory;
