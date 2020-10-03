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

const RightSideBarNameAndImage = withRouter((props: any) => {
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
        if (res?.data?.data?.verified === true) {
          return setFormState({
            ...state,
            user: res.data.data,
          });
        }
        setTimeout(() => {
          if (!res.data.data.verified) {
            return props.history.push("/verify-account");
          }
        }, 0);
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
    const userId = userdata?.user?.id;
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
  const {
    show,
    subject,
    success,
    errorMessage,
    message,
    user,
    isloading,
  }: any = state;
  console.log(user);

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
  return (
    <>
      <div className="fkex ">
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
    </>
  );
});
export default RightSideBarNameAndImage;
