import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBar from "../SubComponents/Navbar";
import HomeLayer1 from "../../assets/HomeLayer1.svg";
import "./Home.css";
import howitwk1 from "../../assets/howitwk1.svg";
import howitwk2 from "../../assets/howitwk2.svg";
import howitwk3 from "../../assets/howreplacement.png";
import howitwk4 from "../../assets/howitwk4.svg";
import how1 from "../../assets/how1.png";
import how2 from "../../assets/how2.png";
import how3 from "../../assets/how3.png";
import how4 from "../../assets/how4.png";
import Testimonial from "./testimonial";
import Footer from "./Footer";
import GetMobileApp from "./GetMobileApp";
import { Link } from "react-router-dom";
import { useEffect, lazy } from "react";
import Spinner from "react-bootstrap/Spinner";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import SliderMobile from "../SubComponents/SliderMobile";
let Slider = lazy(() => import("../SubComponents/Slider"));

interface IAppProps {}

class Home extends React.Component {
  componentDidMount() {
    window.scrollTo(-0, -0);
  }
  render() {
    return (
      <>
        <NavBar />
        <Container fluid={true} className="push">
          <Row>
            <Col md={5} className="jusk">
              <div className="home0">
                <div className="hom1">Energy Everywhere</div>
                <div className="greenground"></div>
                <div className="home2">
                  Now everyone can buy and sell energy commodities on Nigeria's
                  Premiere Energy Trading Platform
                </div>
                <div>
                  <div className="getstarted">
                    <Link to="/signup">GET STARTED</Link>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={7} className="jusk1">
              <img src={HomeLayer1} className="homeimage1" alt="homeimage" />
            </Col>
          </Row>
          <Row className="secrow1">
            <Col md={8} className="secrow2">
              <div className="home3">Disrupting The Energy Market</div>
              <div className="home4">
                Pramopro is an energy trading company that is pioneering the
                decentralisation of the energy sector - tailoring it to maximize
                the welfare of the common man, rather than utilities. Our
                company’s business model directly connects energy customers
                (producers and consumers of energy products) in an open energy
                marketplace, allowing for P2P energy trading to occur
                efficiently between the involved parties, without the need for
                an intermediary.
              </div>
            </Col>
          </Row>
          <Row className="thirdrow1">
            <Col md={12} className="thirdrow4">
              <div>
                <div className="home5">Products</div>
                <div className="greenground1"></div>
              </div>
              <div className="home6a jdjd">Explore our opportunities</div>
              <div>
                <React.Suspense
                  fallback={
                    <Col className="sliderhomepage">
                      <Spinner
                        variant="success"
                        animation="border"
                        role="status"
                      >
                        <span className="sr-only">Loading</span>
                      </Spinner>
                    </Col>
                  }
                >
                  <BrowserView>
                    <Slider />
                  </BrowserView>
                  <MobileView>
                    <SliderMobile />
                  </MobileView>
                </React.Suspense>
              </div>
            </Col>
          </Row>
          <Row className="thirdrow2 jcenter">
            <Col md={11}>
              <div className="home5 centerp">How it works</div>
              <div>
                <div className="card1wrapper">
                  <div className="card2wrapper">
                    <img src={how1} className="how12" alt="description" />
                    <div>
                      <img
                        src={howitwk1}
                        className="howitworksimage"
                        alt="howitworksimage"
                      />
                      <div className="steptext">Register</div>
                    </div>
                  </div>
                  <div className="card2wrapper">
                    <img src={how2} className="how11" alt="description" />
                    <div>
                      <img
                        src={howitwk2}
                        className="howitworksimage"
                        alt="howitworksimage"
                      />
                      <div className="steptext">
                        View all available products
                      </div>
                    </div>
                  </div>
                  <div className="card2wrapper">
                    <img src={how3} className="how11" alt="description" />
                    <div>
                      <img
                        src={howitwk3}
                        className="howitworksimage4"
                        alt="howitworksimage"
                      />
                      <div className="steptext sttw">
                        Pay for desired products
                      </div>
                    </div>
                  </div>
                  <div className="card2wrapper">
                    <img src={how4} className="how11" alt="description" />
                    <div>
                      <img
                        src={howitwk4}
                        className="howitworksimage"
                        alt="howitworksimage"
                      />
                      <div className="steptext">Get payback after trading</div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Testimonial />
          <Row className="thirdrow1 shiftbottom1"></Row>
          <GetMobileApp />
          <Footer />
        </Container>
      </>
    );
  }
}

export default Home;
