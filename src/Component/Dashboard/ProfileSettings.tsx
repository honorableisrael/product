import * as React from "react";
import NavBar from "../SubComponents/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import "./Dashboard.css";
import SideBar from "./sidebar";
import PersonalDetails from "./PersonalDetails";
import editprofilephoto from "../../assets/editprofilephoto.png";
import ContactDetails from "./ContactDetails";
import NOKDetails from "./NOKDetails";
import BankDetails from "./BankDetails";
import Password from "./Password";

const ProfileSettings = () => {
  return (
    <>
      <NavBar />
      <Container fluid={true} className="push">
        <Row className="dashrow">
          <SideBar settings={true}/>
          <Col md={10} className="mainbody11">
            <Row className="rowss">
              <Col md={12}>
                <div className="settings col-md-11">
                  <div>Settings</div>
                  <div className="seet">
                    <img src={editprofilephoto} alt="editprofilephoto" />
                    <div className="change11">Change Picture</div>
                  </div>
                </div>
                <Col md={{ span: 11 }} className="userfirstitems-tabs ">
                  <Tabs
                    defaultActiveKey="PersonalDetails"
                    id="uncontrolled-tab-example"
                  >
                    <Tab eventKey="PersonalDetails" title="Personal Details">
                      <PersonalDetails />
                    </Tab>
                    <Tab eventKey="ContactDetails" title="Contact Details">
                      <ContactDetails />
                    </Tab>
                    <Tab eventKey="nxtofkin" title="Next-Of-Kin Details">
                      <NOKDetails />
                    </Tab>
                    <Tab eventKey="bankdetails" title="Bank Details">
                      <BankDetails />
                    </Tab>
                    <Tab eventKey="ResetPassword" title="Password">
                      <Password />
                    </Tab>
                  </Tabs>
                </Col>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default ProfileSettings;
