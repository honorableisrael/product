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
import ProductPurchased from "./ProductPurchased";
import RightSideBar from "./rightSideBar";
import ProductReservedTab from "./ProductReservedTab";
import PurchaseSummary from "./PurchaseSummary";
import MobileSideNav from "./MobileSideNav";

const DashboardProducts = () => {
  return (
    <>
      <NavBar />
      <Container fluid={true} className="push">
        <Row className="dashrow">
          <SideBar products={true} />
          <Col md={6} className="mainbody11">
            <Row className="rowss">
            <MobileSideNav/>
              <Col md={12}>
                <div className="sponsors col-md-11">
                  <div>Sponsorship</div>
                </div>
                <Col md={{ span: 12 }} className="userfirstitems-tabs nopad11">
                  <Tabs
                    defaultActiveKey="PersonalDetails"
                    id="uncontrolled-tab-example"
                  >
                    <Tab eventKey="PersonalDetails" title="Products Purchased">
                      <ProductPurchased />
                    </Tab>
                    {/* <Tab eventKey="ContactDetails" title="Products Reserved">
                      <ProductReservedTab />
                    </Tab> */}
                    <Tab eventKey="nxtofkin" title="Transaction Summary">
                      <PurchaseSummary />
                    </Tab>
                  </Tabs>
                </Col>
              </Col>
            </Row>
          </Col>
          <RightSideBar bg={"#FAFAFA"} />
        </Row>
      </Container>
    </>
  );
};
export default DashboardProducts;
