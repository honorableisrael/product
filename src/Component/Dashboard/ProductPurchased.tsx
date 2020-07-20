import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Dashboard.css";
import dashcenter from "../../assets/dashcenter.svg";
import Form from "react-bootstrap/Form";
import RightSideBar from "./rightSideBar";
import slide1 from "../../assets/slide1.png";
import Products from "../Products/Product";
import { Link } from "react-router-dom";

const ProductPurchased = () => {
  const [state, setFormState] = React.useState({
    errorMessage: "",
    firstname: "",
    lastname: "",
    dob: "",
    gender: "",
    phone: "",
    nationality: "",
    email: "",
    isloading: false,
  });
  const {
    errorMessage,
    firstname,
    lastname,
    dob,
    gender,
    phone,
    nationality,
    email,
    isloading,
  } = state;
  const onchange = (e: any) => {
    setFormState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };
  const handleChange = (e) => {
    setFormState({
      ...state,
      gender: e.target.value,
    });
  };
  return (
    <>
      <Row className="refdark2">
        <Col md={10}>
          <Form>
            <Row>
              <Col md={12} className="modea nopad11">
                {false && (
                  <div className="midcontent2">
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
                    <div className="exploreprod">EXPLORE PRODUCTS</div>
                  </div>
                )}
                {
                  <Col md={12} className="productlist nopad11">
                    <div className="slidewrapperproduct">
                      <div className="slide1wrapdashboardproduct">
                        <div className="finished1product">
                          <div className="finished11dashboardproduct">
                            {" "}
                            <span
                              className="redcircleproduct nomargin"
                              title="finished"
                            ></span>
                          </div>
                        </div>
                        <img
                          src={slide1}
                          alt="slide1"
                          className="slide1product"
                        />
                        <div className="slidetitleproduct">
                          <div>AGO-111</div>
                          <div>
                            <span className="buyatproduct">Cost </span>
                            <span className="amountproduct smalltext">
                              N100,000
                            </span>
                            <div>
                              <span className="buyatproduct">Sold at</span>
                              <span className="amountproduct smalltext">
                                N800,000
                              </span>
                            </div>
                            <div className="buyatproduct textssproduct">
                              In 8 months
                            </div>
                            <div className="slider22product">
                              <span className="rightarrw1product">View</span>
                              <span className="rightarrwproduct">&#8594;</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="slide1wrapdashboardproduct makelargerproduct">
                        <div className="finished1product">
                          <div className="Loadeddashboardproduct">
                            {" "}
                            <span
                              className="greencircleproduct nomargin"
                              title="loaded"
                            ></span>
                          </div>
                        </div>
                        <img
                          src={slide1}
                          alt="slide1"
                          className="slide1product"
                        />
                        <div className="slidetitleproduct">
                          <div>AGO-111</div>
                          <div>
                            <span className="buyatproduct">Cost</span>
                            <span className="amountproduct smalltext">
                              N100,000
                            </span>
                            <div>
                              <span className="buyatproduct">Sold at</span>
                              <span className="amountproduct smalltext">
                                N800,000
                              </span>
                            </div>
                            <div className="buyatproduct textssproduct">
                              In 8 months
                            </div>
                            <div className="slider22product">
                              <span className="rightarrw1product">View</span>
                              <span className="rightarrwproduct">&#8594;</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="slide1wrapdashboardproduct makelargerproduct">
                        <div className="finished1product">
                          <div className="Loadeddashboardproduct">
                            {" "}
                            <span
                              className="greencircleproduct  nomargin"
                              title="loaded"
                            ></span>
                          </div>
                        </div>
                        <img
                          src={slide1}
                          alt="slide1"
                          className="slide1product"
                        />
                        <div className="slidetitleproduct">
                          <div>AGO-111</div>
                          <div>
                            <span className="buyatproduct">Cost</span>
                            <span className="amountproduct">N100,000</span>
                            <div>
                              <span className="buyatproduct">Sold at</span>
                              <span className="amountproduct smalltext">
                                N800,000
                              </span>
                            </div>
                            <div className="buyatproduct textssproduct">
                              In 8 months
                            </div>
                            <div className="slider22product">
                              <span className="rightarrw1product">View</span>
                              <span className="rightarrwproduct">&#8594;</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="slide1wrapdashboardproduct makelargerproduct">
                        <div className="finished1product">
                          <div className="Loadeddashboardproduct">
                            {" "}
                            <span
                              className="greencircleproduct nomargin"
                              title="loaded"
                            ></span>
                          </div>
                        </div>
                        <img
                          src={slide1}
                          alt="slide1"
                          className="slide1product"
                        />
                        <div className="slidetitleproduct">
                          <div>AGO-111</div>
                          <div>
                            <span className="buyatproduct">Cost</span>
                            <span className="amountproduct smalltext">
                              N100,000
                            </span>
                            <div>
                              <span className="buyatproduct">Sold at</span>
                              <span className="amountproduct smalltext">
                                N800,000
                              </span>
                            </div>
                            <div className="buyatproduct textssproduct">
                              In 8 months
                            </div>
                            <div className="slider22product">
                              <span className="rightarrw1product">View</span>
                              <span className="rightarrwproduct">&#8594;</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center ksk">
                      <Link to="/products">Explore Products</Link>
                    </div>
                  </Col>
                }
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ProductPurchased;
