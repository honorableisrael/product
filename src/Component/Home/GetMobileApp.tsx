import * as React from "react";
import "./testimonial.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Home.css";
import sideImage3 from "../../assets/sideImage3.png";
import appStore1 from "../../assets/appstore1.svg";
import appStore2 from "../../assets/appstore2.svg";
import googleplaystore from "../../assets/app-store2.svg";

const GetMobileApp = () => {
  return (
    <>
      <Row className="jcenter">
        <Col md={11} className=" startingtoday">
          <div className="fle121">
            <div className="box121 liks">
              <div className="home5 exp">Start Trading Today</div>
              <div className="home6a">
                Download our mobile app on the Google Playstore trade different
                opportunities and monitor your tradings on the go.
              </div>
              <div>
                <a
                  href="https://play.google.com/store/apps/details?id=com.pramopro.app"
                  className="playstorelink"
                  target="blank"
                >
                  <img src={appStore2} className="playstore" alt="app-store" />
                </a>
                <img src={appStore1} className="playstore" alt="playstore" />
              </div>
            </div>
            <div className="sideImage3wrap">
              <img src={sideImage3} className="sideImage3" alt="sideImage3" />
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default GetMobileApp;
