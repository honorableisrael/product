import * as React from "react";
import NavBar from "../SubComponents/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import standingman from "../../assets/standingman.svg";
import prodcash from "../../assets/prodcash.png";
import "./Dashboard.css";
import SideBar from "./sidebar";
import RightSideBar from "./rightSideBar";
import MobileSideNav from "./MobileSideNav";

const DashboardProductSubscribed = () => {
  return (
    <>
      <NavBar />
      <Container fluid={true} className="push">
        <Row className="dashrow">
          <SideBar products={true}/>
          <Col md={10} className="mainbody11">
            <Row className="rowss">
            <MobileSideNav/>
              <Col md={8} className="prodcu">
                <div className="wr111">
                  <div className="productcash">
                    <img
                      src={standingman}
                      className="mancashimg"
                      alt="productcash"
                    />
                  </div>
                  <div>
                    <div className="productsdash">Products</div>
                    <div className="productsdash1">Total Subscribed</div>
                  </div>
                  <div className="productsdash2">10</div>
                </div>
                <div className="wr111">
                  <img
                    src={prodcash}
                    className="productcash"
                    alt="productcash"
                  />
                  <div>
                    <div className="productsdash">Sales</div>
                    <div className="productsdash1">Total Sales</div>
                  </div>
                  <div className="productsdash2">N100000</div>
                </div>
              </Col>
             <RightSideBar/>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default DashboardProductSubscribed;
