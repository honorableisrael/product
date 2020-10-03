import * as React from "react";
import "./testimonial.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import appStore1 from "../../assets/appstore1.svg";
import appStore2 from "../../assets/appstore2.svg";
import googleplaystore from "../../assets/app-store2.svg";
import linkedin from "../../assets/linkedin.png";
import pramopro4 from "../../assets/pramopronavlogo.svg";
import "./Home.css";
import { Link } from "react-router-dom";

const Footer = () => {
  let date: any = new Date();
  const [state, updateState] = React.useState<any>({ date });
  console.log(state.date);
  return (
    <>
      <Row>
        <Col md={12} className="mn12">
          <div className="footwrap">
            <div className="n11">
              <img
                src={pramopro4}
                className="pramopronavlogo"
                alt="pramopro4"
              />
            </div>
            <div className="n01">
              <div className="footerhead">COMPANY</div>
              <div className="n02">
                <div className="footertitle">
                  <Link to="/">Home</Link>
                </div>
                <div className="footertitle">
                  <Link to="/about">About</Link>
                </div>
                <div className="footertitle">
                  <Link to="/products">Products</Link>
                </div>
              </div>
            </div>
            <div className="n01">
              {/* <div className="footerhead">FOLLOW US</div> */}
              <div className="n02">
                <span className="ckks">
                  {/* <img src={linkedin} className="linkedin" alt="linkedin" /> */}
                </span>
              </div>
            </div>
          </div>
        </Col>
        <Col md={12} className="bgf1">
          <div className="oilde">
            <div className="nw2">
              <div className="footertitle">
                <Link to="/privacypolicy">Privacy Policy</Link>
              </div>
              <div className="footertitle">
                <Link to="/faqs">FAQ's</Link>
              </div>
              <div className="footertitle">
                <Link to="/contact">Contact Us</Link>
              </div>
            </div>
            <div className="Appwrapper">
              <a
                href="https://play.google.com/store/apps/details?id=com.pramopro.app"
                className="playstorelink"
                target="blank"
              >
                <img src={appStore2} className="playstore1" alt="playstore" />
              </a>
              {/* <img src={appStore1} className="playstore1" alt="app-store" /> */}
            </div>
          </div>
        </Col>
        <Col md={12} className="footlast12 bgf2">
          <div className="oilde">
            <div className="footertitle">
              Copyright {state.date.getFullYear()} Pramopro.All rights reserved.
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Footer;
