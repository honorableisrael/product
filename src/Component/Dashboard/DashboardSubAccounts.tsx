import * as React from "react";
import NavBar from "../SubComponents/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useraccount from "../../assets/useraccount.png";
import "./Dashboard.css";
import SideBar from "./sidebar";
import RightSideBar from "./rightSideBar";
import { Link } from "react-router-dom";
import MobileSideNav from "./MobileSideNav";

const DashboardSubaccounts = () => {
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
                  <div>Sub-Accounts</div>
                  <div className="viewsubinfo">
                    View all sub-accounts under your account.
                  </div>
                </div>
                <div className="suss1">
                  <div className="emil1">
                    <img
                      src={useraccount}
                      className="useraccount"
                      alt="useraccount"
                    />
                    <div>
                      <div className="usernameo1">
                        <Link to="/convertsubaccount">Adeshina Adedapo</Link>
                      </div>
                      <div className="em11">meetdapo1@gmail.com</div>
                    </div>
                  </div>
                  <div className="conveta">Convert</div>
                </div>
                <div className="suss1">
                  <div className="emil1">
                    <img
                      src={useraccount}
                      className="useraccount"
                      alt="useraccount"
                    />
                    <div>
                      <div className="usernameo1">Adeshina Adedapo</div>
                      <div className="em11">meetdapo1@gmail.com</div>
                    </div>
                  </div>
                  <div className="conveta">Convert</div>
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
export default DashboardSubaccounts;
