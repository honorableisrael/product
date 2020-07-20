import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./productdescription.css";
import NavBar from "../SubComponents/Navbar";
import slide11 from "../../assets/slide11.png";
import Footer from "../Home/Footer";
import GetMobileApp from "../Home/GetMobileApp";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

interface IAppProps {}
type State = {
  numberofbarrels: any | string;
  orderFor: string;
  show: boolean;
  success: string;
  errorMessage: string;
  sponsorFirstname: string;
  sponsorLastName: string;
  sponsorEmail: string;
};
const ProductDescription: React.FC = (props: any) => {
  React.useEffect(() => {
    window.scrollTo(-0, -0);
  }, []);
  const [state, setNewState] = useState<State>({
    numberofbarrels: 1,
    orderFor: "",
    show: false,
    success: "",
    errorMessage: "",
    sponsorFirstname: "",
    sponsorLastName: "",
    sponsorEmail: "",
  });
  const onchange = (e) => {
    setNewState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };
  const {
    numberofbarrels,
    show,
    success,
    errorMessage,
    sponsorEmail,
    sponsorFirstname,
    sponsorLastName,
  } = state;
  const onInputChange = (e) => {
    const letterNumber = /^[A-Za-z]+$/;
    if (e.target.value < 0) {
      return setNewState({
        ...state,
        numberofbarrels: 0,
      });
    }
    if (numberofbarrels >= 0) {
      return setNewState({
        ...state,
        numberofbarrels: e.target.value.replace(/[^0-9]+/g, ""), //only accept numbers
      });
    }
    if (numberofbarrels === "") {
      return setNewState({
        ...state,
        numberofbarrels: 0,
      });
    }
    // this.payBackCalculation();
  };
  const handleSelectChange = (e) => {
    console.log(e?.target?.value);
    if (e?.target?.value === "others") {
      return handleShow();
    }
    setNewState({
      ...state,
      orderFor: e.target.value,
    });
  };
  const handleDecrease = () => {
    setNewState({
      ...state,
      numberofbarrels: numberofbarrels > 0 ? numberofbarrels - 1 : 0,
    });
    // this.validateTheCapitalOfUser()
  };
  const handleIncrease = () => {
    setNewState({
      ...state,
      numberofbarrels: numberofbarrels > 0 ? parseInt(numberofbarrels) + 1 : "",
    });
    // this.validateTheCapitalOfUser()
  };
  const handleClose = () => {
    setNewState({
      ...state,
      show: false,
    });
  };
  const handleShow = () => {
    setNewState({
      ...state,
      show: true,
    });
  };
  return (
    <>
      <NavBar />
      <Container fluid={true} className="push">
        <Row className="jcenter graybg">
          <Col md={10} className="nopaddin">
            <div className="policyh text-center">Product Detail</div>
          </Col>
        </Row>
        <Row className="jcenter">
          <Col md={10} className="padin01">
            <Row className="padin01 k122">
              <Col md={6} className="six11">
                <div className="imgcontainer">
                  <img src={slide11} className="slide11" alt="slide11" />
                </div>
              </Col>
              <Col md={6}>
                <div className="producttile1">
                  <span className="prodname">AGO-0012</span>
                  <div className="Loadedproductdesc">
                    {" "}
                    <span className="greencircleproductdesc"></span> Loaded
                  </div>
                </div>
                <div className="pricearea">
                  <div className="buyattext">
                    Buy at<span className="buyatprice">₦100,000</span>
                  </div>
                  <div className="buyattext">
                    Sell at<span className="buyatprice">₦160,000</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="buyattext">In 9 months</div>
                </div>
                <hr />
                <div className="prod133">
                  <span className="prodname">Quantity</span>
                  <div className="incww">
                    <span className="numberdecrease" onClick={handleDecrease}>
                      -
                    </span>
                    <input
                      type="text"
                      value={numberofbarrels}
                      onChange={onInputChange}
                      className="totalSelected capital-input"
                    />{" "}
                    <span className="numberincrease" onClick={handleIncrease}>
                      +
                    </span>
                  </div>
                  <span className="prodname">Order for</span>
                  <div>
                    <Form.Control
                      as="select"
                      className="selecss loks jss"
                      onChange={handleSelectChange}
                    >
                      <option className="payfor" value="self">
                        Self
                      </option>
                      <option className="payfor" value="others">
                        Others
                      </option>
                    </Form.Control>
                  </div>
                </div>
                <div className="textrift">
                  <div className="placeorder">ORDER</div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md={10} className="prosd">
            <div className="proddesctit">Product Description</div>
            <hr />
            <div className="popular">
              AGO is purpolarly called Diesel. Diesel fuel, also called diesel
              oil, combustible liquid used as fuel for diesel engines,
              ordinarily obtained from fractions of crude oil that are less
              volatile than the fractions used in gasoline.
            </div>
          </Col>
        </Row>
        <Modal show={show} onHide={handleClose}>
          <div className="ssds1w">
            <Modal.Header closeButton>
              <Modal.Title className="mks1">
                {" "}
                <div>
                  <span className="mks2">Others Details</span>{" "}
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="text-success messagetocrm"> {success}</p>
              <p className="text-danger messagetocrm"> {errorMessage}</p>
              <div className="">
                <div>
                  <Form.Group>
                    <h6 className="user12">First Name</h6>
                    <Form.Control
                      type="text"
                      value={sponsorFirstname}
                      className="userfield"
                      id="sponsorName"
                      onChange={onchange}
                      placeholder=""
                    />
                  </Form.Group>
                </div>
                <div>
                  <Form.Group>
                    <h6 className="user12">Last Name</h6>
                    <Form.Control
                      type="text"
                      value={sponsorLastName}
                      className="userfield"
                      id="sponsorLastName"
                      onChange={onchange}
                      placeholder=""
                    />
                  </Form.Group>
                </div>
                <div>
                  <Form.Group>
                    <h6 className="user12">Email</h6>
                    <Form.Control
                      type="text"
                      value={sponsorEmail}
                      className="userfield"
                      id="sponsorEmail"
                      onChange={onchange}
                      placeholder=""
                    />
                  </Form.Group>
                </div>
              </div>
              <Col md={12}>
                <div className="btnwwrap btnwwrap2">
                  <div className="conform">Proceed</div>
                </div>
              </Col>
              <i
                className="fa fa-paper-plane-o field-icon-send"
                aria-hidden="true"
              ></i>
            </Modal.Body>
          </div>
        </Modal>
        <GetMobileApp />
        <Footer />
      </Container>
    </>
  );
};

export default ProductDescription;
