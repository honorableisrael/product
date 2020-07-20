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
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "../Products/Product.css";

const RightSideBar = (props: any) => {
  const [state, setFormState] = useState({
    show: false,
    subject: "",
    message: "",
    errorMessage: "",
    success: "",
    isloading: false,
  });
  const { show, subject, success, errorMessage, message, isloading } = state;
  const handleClose = () => {
    setFormState({
      ...state,
      show: false,
    });
  };
  const onchange = (e: any): void => {
    setFormState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };
  const submitForm = () => {
    //something happens
  };
  return (
    <>
      <Col md={4} style={{ background: props.bg }}>
        <div className="fkex">
          <div className="dassd">
            <div>
              <span className="free">Welcome,</span>{" "}
              <span className="urname">Adeshina Adedapo</span>
            </div>
            <div className="email11">meetdapo@gmail.com</div>
          </div>
          <div>
            <img src={avatar} className="avatarq" alt="avatar" />
          </div>
        </div>
        <div className="email11 text-center">
          {" "}
          <img src={daterange1} className="dategreen" alt="daterange" /> Trading
          Since Sep 27, 2019
        </div>
        <div className="minicard">
          <div className="money12">
            <img src={money1} className="money1" alt="money1" />
            <div className="wxp">
              <span className="expectedret"> My Expected Return</span>
              <div className="expectedret2">No activities</div>
            </div>
          </div>
          <div className="money12">
            <img src={dateorange} className="money1" alt="money1" />
            <div className="wxp">
              <span className="expectedret"> End-of-cycle day</span>
              <div className="expectedret2">No activities</div>
            </div>
          </div>
          <div className="money12">
            <img src={moneyorange} className="money1" alt="money1" />
            <div className="wxp">
              <span className="expectedret">Collected Return</span>
              <div className="expectedret2">No activities</div>
            </div>
          </div>
          <div className="moneydd">
            <div className="illust">
              <img
                src={crmillustration}
                className="crmillustration"
                alt="crmillustration"
              />
            </div>
            <div className="quesmes">
              Have any questions or issues to resolve?
            </div>
            <div
              className="contactofficer"
              onClick={()=>setFormState({
                ...state,
                show: true,
              })}
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
            <Form noValidate onSubmit={submitForm}>
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
                <div className="continue wwe2">Continue</div>
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
};
export default RightSideBar;
