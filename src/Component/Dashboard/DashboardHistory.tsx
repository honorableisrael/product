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
import Spinner from "react-bootstrap/Spinner";
import RightSideBarCRM from "./rightSideBarCRM";
import RightSideBarNameAndImage from "./RightSideBarNameandImage";
const moment = require("moment");

const DashboardHistory = (props: any) => {
  const [state, setFormState] = useState({
    show: false,
    subject: "",
    message: "",
    errorMessage: "",
    nextLink: "",
    prevLink: "",
    user: [],
    isloading: false,
    isloading2: false,
  });
  const { user, nextLink, prevLink, isloading2 }: any = state;
  React.useEffect(() => {
    setFormState({
      ...state,
      isloading2: true,
    });
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
          user: res.data.data.data,
          nextLink: res.data.data.links.next,
          prevLink: res.data.data.links.prev,
          isloading2: false,
        });
      })
      .catch((err) => {
        if (err?.status === 401) {
          props.history.push("/signin");
        }
        setFormState({
          ...state,
          isloading2: false,
        });
        console.log(err);
      });
  }, []);
  const LoadNewData = () => {
    setFormState({
      ...state,
      isloading2: true,
    });
    const loggedIn = localStorage.getItem("userDetails");
    const userdata = loggedIn ? JSON.parse(loggedIn) : "";
    const token = loggedIn ? JSON.parse(loggedIn).token : "";
    Axios.get(`${nextLink}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log(res);
        setFormState({
          ...state,
          user: res.data.data.data,
          isloading2: false,
          nextLink: res.data.data.links.next,
          prevLink: res.data.data.links.prev,
        });
      })
      .catch((err) => {
        if (err?.status === 401) {
          props.history.push("/signin");
        }
        setFormState({
          ...state,
          isloading2: false,
        });
        console.log(err);
      });
  };
  const LoadOldData = () => {
    setFormState({
      ...state,
      isloading2: true,
    });
    const loggedIn = localStorage.getItem("userDetails");
    const userdata = loggedIn ? JSON.parse(loggedIn) : "";
    const token = loggedIn ? JSON.parse(loggedIn).token : "";
    Axios.get(`${prevLink}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log(res);
        setFormState({
          ...state,
          user: res.data.data.data,
          nextLink: res.data.data.links.next,
          prevLink: res.data.data.links.prev,
          isloading2: false,
        });
      })
      .catch((err) => {
        if (err?.status === 401) {
          props.history.push("/signin");
        }
        setFormState({
          ...state,
          isloading2: false,
        });
        console.log(err);
      });
  };
  const formatHours = (date) => {
    const dateTime = moment(date).format("h:mm:ss a");
    return dateTime;
  };
  const formatDay = (date) => {
    const dateTime = moment(date).format("D");
    return dateTime;
  };
  const formatWeekDay = (date) => {
    const dateTime = moment(date).format("dddd");
    return dateTime;
  };
  const formatTime = (date) => {
    const dateTime = moment(date).format("MMMM YYYY");
    return dateTime;
  };
  console.log(user);
  console.log(nextLink);
  return (
    <>
      <NavBar />
      <Container fluid={true} className="push">
        <Row className="dashrow">
          <SideBar history={true} />
          <Col md={10} className="mainbody11">
            <Row className="rowss">
              <MobileSideNav />
              <Col md={7} className="prodcu histttm">
                <div className="mobileitle ddw2">
                  <RightSideBarNameAndImage />
                </div>
                <div className="historywrap">
                  <div>History</div>
                  <div className="midwrap">
                    <span>
                      {prevLink !== null && (
                        <img
                          src={arrowleft}
                          className="arrowleft"
                          alt="arrowright"
                          onClick={LoadOldData}
                        />
                      )}
                    </span>
                    <span> {formatTime(user[0]?.created_at)}</span>
                    <span>
                      {nextLink && (
                        <img
                          src={arrowleft}
                          className="arrowright"
                          alt="arrowleft"
                          onClick={LoadNewData}
                        />
                      )}
                    </span>
                  </div>
                </div>
                {isloading2 && (
                  <div className="preloadercent">
                    <Spinner variant={"success"} animation={"grow"}></Spinner>
                  </div>
                )}
                {user?.map((data, i) => (
                  <div className="historywrap1" key={i}>
                    <div className="datedata">
                      <div className="days">
                        {formatWeekDay(data.created_at)}
                      </div>
                      <div className="numberday">
                        {formatDay(data.created_at)}{" "}
                      </div>
                    </div>
                    <div className="srtte">
                      <div className="accountaction">{data.caption}</div>
                      <div className="accountaction2">{data.summary}</div>
                    </div>
                    <div className="actiontime">
                      <div>{formatHours(data.created_at)}</div>
                    </div>
                  </div>
                ))}
              </Col>
              <div className="tmobileonly">
                <RightSideBarCRM />
              </div>
              <RightSideBar />
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default DashboardHistory;
