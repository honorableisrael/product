import * as React from "react";
import "./Dashboard.css";
import dashcenter from "../../assets/dashcenter.svg";
import daterange1 from "../../assets/dategreen.svg";
import avatar from "../../assets/avatar.png";
import money1 from "../../assets/money1.png";
import moneyorange from "../../assets/moneyorange.png";
import dateorange from "../../assets/dateorange.png";
import crmillustration from "../../assets/crmillustration.png";
import standingman from "../../assets/standingman.svg";
import prodcash from "../../assets/prodcash.png";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, withRouter } from "react-router-dom";
import "../Products/Product.css";
import Axios from "axios";
import moment from "moment";
import { API } from "../../config";

const RightSideBar = withRouter((props: any) => {
  const [state, setFormState] = useState({
    show: false,
    subject: "",
    message: "",
    errorMessage: "",
    user: {},
    success: "",
    isloading: false,
  });
  const [Appstate, setNewState] = React.useState({
    endOfCycle: "",
    expectedReturn: "",
    errorMessage: "",
    collectedReturn: "",
  });
  const { endOfCycle, expectedReturn, collectedReturn } = Appstate;
  useEffect(() => {
    const loggedIn = localStorage.getItem("userDetails");
    const userdata = loggedIn ? JSON.parse(loggedIn) : "";
    const token = loggedIn ? JSON.parse(loggedIn).token : "";
    Axios.get(`${API}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log(res);
        if (res?.status === 401) {
          props.history.push("/signin");
        }
        if (res.data.data.verified === false) {
          return props.history.push("/verify-account");
        }
        if (res?.data?.data?.verified === true) {
          setFormState({
            ...state,
            user: res.data.data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const loggedIn = localStorage.getItem("userDetails");
    const userdata = loggedIn
      ? JSON.parse(loggedIn)
      : props?.history?.push("/signin");
    const token = loggedIn ? JSON.parse(loggedIn).token : "";
    //check location and redirect to realtime
    const changeLocation = localStorage.getItem("ChangeLocation");
    const newLocation = changeLocation ? JSON.parse(changeLocation) : "";
    console.log(newLocation);
    if (newLocation) {
      localStorage.removeItem("ChangeLocation");
      props.history.push("/realtime");
    }
    const userId = userdata.user.id;
    Axios.get(`${API}/user/statistics`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log(res);
        setNewState({
          ...Appstate,
          endOfCycle: res.data.data.endOfCycle,
          expectedReturn: res.data.data.expectedReturn,
          collectedReturn: res.data.data.collectedReturn,
        });
      })
      .catch((err) => {
        setNewState({
          ...Appstate,
          errorMessage: "Failed to load try again later",
        });
      });
  }, []);
  const sendMessageToCrm = () => {
    const loggedIn = localStorage.getItem("userDetails");
    const userdata = loggedIn ? JSON.parse(loggedIn) : "";
    const token = loggedIn ? JSON.parse(loggedIn).token : "";
    setFormState({
      ...state,
      isloading: true,
    });
    const data = {
      subject,
      message,
    };
    Axios.post(`${API}/contact/crm`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log(res);
        if (res.data.responseStatus === 200) {
          setFormState({
            ...state,
            isloading: false,
            success: "Message Sent",
          });
          setInterval(
            () =>
              setFormState({
                ...state,
                show: false,
              }),
            2000
          );
        }
        if (res.data.responseStatus == 400) {
          setFormState({
            ...state,
            isloading: false,
            errorMessage: "Message Sending Failed",
          });
          setInterval(
            () =>
              setFormState({
                ...state,
                show: false,
              }),
            2000
          );
        }
      })
      .catch((err) => {
        // console.log(err)
        setFormState({
          ...state,
          isloading: false,
          errorMessage: "Message Sending Failed",
        });
      });
  };

  const {
    show,
    subject,
    success,
    errorMessage,
    message,
    user,
    isloading,
  }: any = state;
  const handleClose = () => {
    setFormState({
      ...state,
      show: false,
    });
  };
  const EndOfCycle = (date) => {
    //change end of cycle date
    if (date) {
      let todayDate = moment(date).format("Do MMM YYYY");
      if (todayDate !== "Invalid date") {
        return todayDate;
      }
    }
    if (date === "") {
      return " ";
    }
  };
  const onchange = (e: any): void => {
    setFormState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };
  const FormatAmount = (amount) => {
    return "₦" + amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  console.log(user);
  return (
    <>
      <Col md={4} style={{ background: props.bg }} className="revcol2">
        <div className="fkex">
          <div className="dassd">
            <div>
              <span className="free">Welcome,</span>{" "}
              <span className="urname">
                {user?.firstname} {user?.lastname}{" "}
                {user.firstname === null && user.lastname === null
                  ? user.fullname
                  : ""}{" "}
              </span>
            </div>
            <div className="email11">{user?.username}</div>
          </div>
          <div>
            <img
              src={user && user.profileImage ? user.profileImage : avatar}
              className="avatarq"
              alt="avatar"
            />
          </div>
        </div>
        <div className="email11 text-center">
          {" "}
          <img src={daterange1} className="dategreen" alt="daterange" /> Trading
          Since {user?.dateRegistered}
        </div>
        <div className="minicard">
          <div className="money12">
            <img src={money1} className="money1" alt="money1" />
            <div className="wxp">
              <span className="expectedret"> My Expected Return</span>
              <div className="expectedret2">
                {expectedReturn
                  ? FormatAmount(expectedReturn)
                  : "No activities"}
              </div>
            </div>
          </div>
          <div className="money12">
            <img src={dateorange} className="money1" alt="money1" />
            <div className="wxp">
              <span className="expectedret"> End-of-cycle day</span>
              <div className="expectedret2">
                {" "}
                {endOfCycle?.trim() ? EndOfCycle(endOfCycle) : "No activities"}
              </div>
            </div>
          </div>
          <div className="money12">
            <img src={moneyorange} className="money1" alt="money1" />
            <div className="wxp">
              <span className="expectedret">Collected Return</span>
              <div className="expectedret2">
                {collectedReturn
                  ? FormatAmount(collectedReturn)
                  : "No activities"}
              </div>
            </div>
          </div>
          <div className="picss">
            <img
              src={crmillustration}
              className="crmillustration"
              alt="crmillustration"
            />
          </div>
          <div className="moneydd">
            <div className="illust"></div>
            <div className="quesmes">
              Have any questions or issues to resolve?
            </div>
            <div
              className="contactofficer"
              onClick={() =>
                setFormState({
                  ...state,
                  show: true,
                })
              }
            >
              CONTACT OFFICER
            </div>
          </div>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Account Officer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form noValidate onSubmit={sendMessageToCrm}>
              <p className="text-success messagetocrm"> {success}</p>
              <p className="text-danger messagetocrm"> {errorMessage}</p>
              <Form.Group>
                <Form.Control
                  type="text"
                  onChange={onchange}
                  required
                  value={subject}
                  id="subject"
                  placeholder="Subject"
                />
              </Form.Group>
            </Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control
                as="textarea"
                placeholder="Message"
                onChange={onchange}
                id="message"
                value={message}
                rows="5"
              />
            </Form.Group>
            <Col md={12}>
              <div className="btnwwrap btnwwrap2">
                <div className="continue1 wwe">
                  <a onClick={handleClose} className="continuelk">
                    Back
                  </a>
                </div>
                <div className="continue wwe2" onClick={sendMessageToCrm}>
                  Continue
                </div>
              </div>
            </Col>
            <i
              className="fa fa-paper-plane-o field-icon-send"
              aria-hidden="true"
            ></i>
          </Modal.Body>
        </Modal>
      </Col>
    </>
  );
});
export default RightSideBar;
