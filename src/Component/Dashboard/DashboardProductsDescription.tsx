import * as React from "react";
import NavBar from "../SubComponents/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../Products/Product.css";
import "./Dashboard.css";
import SideBar from "./sidebar";
import PersonalDetails from "./PersonalDetails";
import editprofilephoto from "../../assets/editprofilephoto.png";
import ContactDetails from "./ContactDetails";
import NOKDetails from "./NOKDetails";
import ProductPurchased from "./ProductPurchased";
import RightSideBar from "./rightSideBar";
import navigategreen from "../../assets/navigategreen.svg";
import slide2 from "../../assets/slide2.png";

const DashboardReservedProductsDescription = () => {
  return (
    <>
      <NavBar />
      <Container fluid={true} className="push">
        <Row className="dashrow">
          <SideBar products={true} />
          <Col md={6} className="mainbody11">
            <Row className="rowss">
              <Col md={12}>
                <div className="sponsors backtoproducts">
                  <div>
                    <img src={navigategreen} alt="navigate" /> BACK TO PRODUCTS
                  </div>
                </div>
                <Col md={{ span: 12 }} className="userfirstitems-tabs nopad11">
                  <Col md={12}>
                    <div className="immgcont">
                      <img
                        src={slide2}
                        className="dashproddescription"
                        alt="dashproddescription"
                      />
                    </div>
                  </Col>
                  <Col md={11} className="dashprod12">
                    <div className="prodflex">
                      <div className="flmx oill">
                        <div>AGO-001</div>
                        <div className="finished1product">
                          <div className="Loadingproduct rmrelpos">
                            {" "}
                            <span className="yellowcircleproduct"></span>{" "}
                            Loading
                          </div>
                        </div>
                      </div>
                      <div className="flmx">
                        <div>
                          <span className="Buyat">Buy at</span>{" "}
                          <span className="priceb">N100,000</span>
                        </div>
                        <div>
                          <span className="Buyat">Sell at</span>
                          <span className="prices"> N800,000</span>
                        </div>
                      </div>
                      <div className="durr1 Buyat">In 8 months</div>
                      <hr/>
                      <div className="prod133 pushsw">
                        <span className="prodname fott">Quantity</span>
                        <div className="incww">
                          <span
                            className="numberdecrease"
                            // onClick={handleDecrease}
                          >
                            -
                          </span>
                          <input
                            type="text"
                            // value={numberofbarrels}
                            // onChange={onInputChange}
                            className="totalSelected capital-input loadinput"
                          />{" "}
                          <span
                            className="numberincrease"
                            // onClick={handleIncrease}
                          >
                            +
                          </span>
                        </div>
                        <div className="placeorder  polss23">BUY</div>
                      </div>
                    </div>
                  </Col>
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
export default DashboardReservedProductsDescription;
