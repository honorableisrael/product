import * as React from "react";
import NavBar from "../SubComponents/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import useraccount from "../../assets/avatar.png";
import "./Dashboard.css";
import SideBar from "./sidebar";
import RightSideBar from "./rightSideBar";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import MobileSideNav from "./MobileSideNav";

const DashboardSubaccountsConvert = () => {
  const [state, setFormState] = useState({
    errorMessage: "",
    email: "",
    password: "",
    passwordhide: true,
    isloading: false,
  });
  const { errorMessage, password, email, passwordhide, isloading } = state;
  const onchange = (e) => {
    setFormState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };
  return (
    <>
      <NavBar />
      <Container fluid={true} className="push">
        <Row className="dashrow">
          <SideBar subaccounts={true} />
          <Col md={10} className="mainbody11">
            <Row className="rowss">
            <MobileSideNav/>
              <Col md={8} className="">
                <div className="sponsorsacc col-md-11">
                  <div className="backks">
                    <Link to="/dashboardsubaccounts" className="backksqq">
                      BACK TO SUB-ACCOUNTS
                    </Link>
                  </div>
                  <div className="viewsubinfo"></div>
                </div>
                <div className="suss131">
                  <div className="iosiis">
                    <div className="wnww">
                      <img
                        src={useraccount}
                        className="useraccount skkd"
                        alt="useraccount"
                      />
                      <div>
                        <div className="usernameo1">Adeshina Adedapo</div>
                        <div className="em11">meetdapo1@gmail.com</div>
                      </div>
                    </div>
                    <div>
                      <div className="phonene">Phone</div>
                      <div className="numssd">09287377311</div>
                    </div>
                    <div className="conveta">Convert</div>
                  </div>
                  <div>
                    <Form className="jjsus">
                      <div className="tite">Bank Details</div>
                      <Form.Group>
                        <h6 className="user12 iuusP">Account Name</h6>
                        <Form.Control
                          type="email"
                          value={email}
                          className="userfield"
                          id="email"
                          onChange={onchange}
                          placeholder=""
                        />
                        <i
                          className="fa fa-envelope field-right-icon"
                          aria-hidden="true"
                        ></i>
                      </Form.Group>
                      <Form.Group>
                        <h6 className="user12 iuusP">Account Number</h6>
                        <Form.Control
                          type="email"
                          value={email}
                          className="userfield"
                          id="email"
                          onChange={onchange}
                          placeholder=""
                        />
                        <i
                          className="fa fa-envelope field-right-icon"
                          aria-hidden="true"
                        ></i>
                      </Form.Group>
                      <Form.Group>
                        <h6 className="user12 iuusP">Bank Name</h6>
                        <Form.Control
                          type="email"
                          value={email}
                          className="userfield"
                          id="email"
                          onChange={onchange}
                          placeholder=""
                        />
                        <i
                          className="fa fa-envelope field-right-icon"
                          aria-hidden="true"
                        ></i>
                      </Form.Group>
                    </Form>
                  </div>
                </div>
                <div>
                  <div className="prodpurchased">Products Purchased</div>
                </div>
                <div>
                  <div className="prodpurchased">Other Sub-Accounts</div>
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
export default DashboardSubaccountsConvert;
