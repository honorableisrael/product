import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import NavBar from "../SubComponents/Navbar";
import "../Products/Product.css";
import Footer from "../Home/Footer";
import GetMobileApp from "../Home/GetMobileApp";
import { useState } from "react";
import pending from "../../assets/pending.svg";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import "./animatedbutton.css";
import { Link } from "react-router-dom";

interface IAppProps {}

const OrderPending: React.FunctionComponent<IAppProps> = (props: any) => {
  const [state, setNewState] = useState({
    product: "",
    filter: "",
  });
  const [paymentState, setFormState] = useState({
    show: false,
    subject: "",
    message: "",
    errorMessage: "",
    success: "",
    isloading: false,
  });
  const {
    show,
    subject,
    success,
    errorMessage,
    message,
    isloading,
  } = paymentState;
  const handleSelectChange = (e) => {
    setNewState({
      ...state,
      filter: e.target.value,
    });
  };
  const handleClose = () => {
    setFormState({
      ...paymentState,
      show: false,
    });
  };
  const onchange = (e: any): void => {
    setFormState({
      ...paymentState,
      [e.target.id]: e.target.value,
    });
  };
  const submitForm = () => {
    //something happens
  };
  const setShow = () => {
    setFormState({
      ...paymentState,
      show: true,
    });
  };

  return (
    <>
      <NavBar />
      <Container fluid={true} className="push">
        <Row className="titleArea">
          <Col md={12}>
            <div className="hproduct">Order Pending</div>
          </Col>
        </Row>
        <Row className="jcenter filterrow wsdw">
          <Col md={5} className="wrapw223">
            <div className="pednin">
              <img src={pending} className="pending" alt="pending" />
            </div>
            <div className="ordertext2">
              Your order has been logged and would be confirmed once payment has
              been confirmed
            </div>
            <div className="Continue">Continue</div>
          </Col>
        </Row>
        <GetMobileApp />
        <Footer />
      </Container>
    </>
  );
};

export default OrderPending;
