import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBar from "../SubComponents/Navbar";
import "./About.css";
import energy from "../../assets/energy.svg";
import flowerpattern from "../../assets/flowerpattern.svg";
import paste from "../../assets/paste.svg";
import aboutlayout from "../../assets/aboutlayout.png";
import Footer from "../Home/Footer";
import GetMobileApp from "../Home/GetMobileApp";
import linkedin from "../../assets/linkedin.svg";
import Dapo from "../../assets/Dapo.png";
import Mena from "../../assets/Mena.png";
import Dan from "../../assets/dansteve.jpg";
import Eloho from "../../assets/Eloho.png";
import Hilary from "../../assets/Israel.png";
import { useState, useEffect } from "react";
import ActiveView from "./mission";
import Axios from "axios";
import { API } from "../../config";

const progressmade = require("../../assets/progressmade.pdf");
interface IAppProps {}

const About: React.FunctionComponent<IAppProps> = (props: any) => {
  const [state, setNewState] = useState({
    mission: true,
    vision: false,
    mantra: false,
    categories: "",
  });
  const { mission, vision, mantra, categories }: any = state;
  const missionBody =
    "At Pramopro, our mission is to ensure energy demand meets supply by enabling trade in energy commodities from everywhere.";
  const missionHeading = "Our Mission";
  const visionHeading = "Our Vision";
  const visionBody =
    "Our vision is to be Africa’s premier digital energy trading platform.";
  const mantraHeading = "Our Mantra";
  const mantraBody = "Energy Everywhere.";
  const changeToMission = () => {
    setNewState({
      ...state,
      vision: false,
      mantra: false,
      mission: true,
    });
  };
  const changeToVision = () => {
    setNewState({
      ...state,
      vision: true,
      mantra: false,
      mission: false,
    });
  };
  const changeToMantra = () => {
    setNewState({
      ...state,
      vision: false,
      mantra: true,
      mission: false,
    });
  };
  useEffect(() => {
    window.scrollTo(-0, -0);
    Axios.get(`${API}/category`)
      .then((res) => {
        console.log(res);
        setNewState({
          ...state,
          categories: res.data.data,
        });
      })
      .catch((err) => {
        // console.log(err)
      });
  }, []);
  const FormatAmount = (amount) => {
    return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <>
      <NavBar />
      <Container fluid={true} className="push">
        <Row className="secrow1">
          <Col md={10}>
            <img src={energy} className="energy" alt="energyicon" />
          </Col>
          <Col md={8} className="secrow2">
            <div className="firstheader">Decentralized Energy Market</div>
            <div className="headertext1">
              Pramopro is Nigeria’s premiere digital energy trading platform
              that enables every and anyone trade energy commodities from the
              comfort of home. This will ensure continued availability of energy
              commodities across the country
            </div>
            <span className="flowerpattern1">
              <img
                src={flowerpattern}
                className="flowerpattern2"
                alt="energy"
              />
              <img
                src={flowerpattern}
                className="flowerpattern3"
                alt="energy"
              />
            </span>
          </Col>
        </Row>
        <Row className="rowabout1 jcenter">
          <Col md={10}>
            <div className="dliver">Deliveries so far</div>
          </Col>
          <Col md={10}>
            <div className="numbwrapper">
              <div className="shiff">
                <div className="number1">
                  {FormatAmount(categories[0]?.totalValue)}
                </div>
                <div className="prodtype">
                  {categories[0] ? categories[0].description : ""}
                </div>
              </div>
              <div className="shiff">
                <div className="number1">
                  {FormatAmount(categories[1]?.totalValue)}
                </div>
                <div className="prodtype">
                  {categories[0] ? categories[1].description : ""}
                </div>
              </div>
              <div>
                <div className="number1">
                  {FormatAmount(categories[2]?.totalValue)}
                </div>
                <div className="prodtype">
                  {categories[0] ? categories[2].description : ""}
                </div>
              </div>
            </div>
            <div className="numbwrapper1">
              <div className="shiff">
                <div className="number1">
                  {FormatAmount(categories[3]?.totalValue)}
                </div>
                <div className="prodtype">
                  {categories[3] ? categories[3].description : ""}
                </div>
              </div>
              <div className="shiff">
                <div className="number1">
                  {FormatAmount(categories[4]?.totalValue)}
                </div>
                <div className="prodtype">
                  {categories[4] ? categories[4].description : ""}
                </div>
              </div>
            </div>
            <div className="downloadwrapper">
              <span>
                <a
                  className="downloadreport"
                  href={progressmade}
                  target="blank"
                >
                  <img src={paste} alt="paste" className="paste" />
                  download report
                </a>
              </span>
            </div>
          </Col>
        </Row>
        <Row className="cw1 jcenter">
          <Col md={10}>
            <Row>
              <Col md={7} className="building12">
                <div className="building">
                  Building the ecosystem for energy trading
                </div>
                <div className="ab1">
                  <div className="ab21">
                    Our platform has opened up this space to individuals who
                    want to solve the inability of key players in the energy
                    sector to meet the growing demands for energy.
                  </div>
                  <div className="ab22">
                    {" "}
                    Want to know the coolest part about this?
                  </div>
                  <div className="ab23">
                    You could earn returns as high as 65% while at it.
                  </div>
                </div>
              </Col>
              <Col md={5}>
                <img
                  src={aboutlayout}
                  className="aboutlayout"
                  alt="aboutlayout"
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="jcenter">
          <Col md={10}>
            <div className="firstwrapp">
              <div className="firstab11">
                <div
                  className={mission ? "activeheader" : "inactiveheader"}
                  onClick={changeToMission}
                >
                  Our Mission
                </div>
                <div
                  className={vision ? "activeheader" : "inactiveheader"}
                  onClick={changeToVision}
                >
                  Our Vision
                </div>
                <div
                  className={mantra ? "activeheader" : "inactiveheader"}
                  onClick={changeToMantra}
                >
                  Our Mantra
                </div>
              </div>
              <div className="firstcontent">
                {mission && (
                  <ActiveView body={missionBody} heading={missionHeading} />
                )}
                {vision && (
                  <ActiveView body={visionBody} heading={visionHeading} />
                )}
                {mantra && (
                  <ActiveView body={mantraBody} heading={mantraHeading} />
                )}
              </div>
            </div>
          </Col>
        </Row>
        <Row className="outeamsection jcenter">
          <Col md={10}>
            <div>
              <div className="home5">Our Team</div>
              <div className="greenground2ab"></div>
            </div>
            <div className="home6a">
              <div>We’re a diverse, close-knit team on an adventure</div>
              <div>to build something enduring, while learning</div>
              <div>something new, every day.</div>
            </div>
            <div className="teamwrapper">
              <div className="teammember">
                <img src={Dapo} alt="teamimage" className="teamimage" />
                <div className="teamtitle">Adeshina Adedapo</div>
                <div className="teamrole">Product Designer</div>
                <img src={linkedin} alt="linkedin" className="linkedin" />
              </div>
              <div className="teammember">
                <img src={Dan} alt="teamimage" className="teamimage mobile" />
                <div className="teamtitle">Dansteve Adekanbi</div>
                <div className="teamrole">Mobile Developer</div>
                <img src={linkedin} alt="linkedin" className="linkedin" />
              </div>
              <div className="teammember">
                <img src={Mena} alt="teamimage" className="teamimage" />
                <div className="teamtitle">Elomena Idise</div>
                <div className="teamrole">Backend Developer</div>
                <img src={linkedin} alt="linkedin" className="linkedin" />
              </div>
              <div className="teammember">
                <img src={Hilary} alt="teamimage" className="teamimage" />
                <div className="teamtitle">Hilary Israel Oba</div>
                <div className="teamrole">Front End Developer</div>
                <img src={linkedin} alt="linkedin" className="linkedin" />
              </div>
              <div className="teammember">
                <img src={Eloho} alt="teamimage" className="teamimage" />
                <div className="teamtitle">Eloho Adheke</div>
                <div className="teamrole">Customer Relationship Manager</div>
                <img src={linkedin} alt="linkedin" className="linkedin" />
              </div>
            </div>
          </Col>
        </Row>
        <GetMobileApp />
        <Footer />
      </Container>
    </>
  );
};

export default About;
