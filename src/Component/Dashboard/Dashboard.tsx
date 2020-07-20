import * as React from "react";
import NavBar from "../SubComponents/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import dashcenter from "../../assets/dashcenter.svg";
import daterange1 from "../../assets/dategreen.svg";
import avatar from "../../assets/avatar.png";
import money1 from "../../assets/money1.png";
import moneyorange from "../../assets/moneyorange.png";
import dateorange from "../../assets/dateorange.png";
import crmillustration from "../../assets/crmillustration.png";
import "./Dashboard.css";
import SideBar from "./sidebar";
import RightSideBar from "./rightSideBar";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <NavBar />
      <Container fluid={true} className="push">
        <Row className="dashrow">
          <SideBar dashboard={true} />
          <Col md={10} className="mainbody11">
            <Row className="rowss">
              <Col md={8} className="modea">
                <div className="midcontent">
                  <img
                    src={dashcenter}
                    className="dashcenter"
                    alt="dashcenter"
                  />
                  <div className="noactivities">No Activities</div>
                  <div>
                    You currently have no active sponsorship activity. Explore
                    our exciting opportunities to get started.
                  </div>
                  <div className="exploreprod">
                    <Link to="/products">EXPLORE PRODUCTS</Link>
                  </div>
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
export default Dashboard;
