import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import NavBar from "../SubComponents/Navbar";
import "../Products/Product.css";
import Footer from "../Home/Footer";
import GetMobileApp from "../Home/GetMobileApp";
import { useState, useEffect } from "react";
import pending from "../../assets/pending.svg";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import "./animatedbutton.css";
import { Link } from "react-router-dom";

interface IAppProps {}

const OrderSuccess: React.FunctionComponent<IAppProps> = (props: any) => {
  const [state, setNewState] = useState<any>({
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
  useEffect(() => {
    const getorder: any = localStorage.getItem("orderDetails");
    const orderproduct = JSON.parse(getorder);
    console.log(orderproduct);
    setNewState({
      ...state,
      product: orderproduct,
    });
  }, []);
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
  console.log(state.product);
  return (
    <>
      <NavBar />
      <Container fluid={true} className="push">
        <Row className="titleArea">
          <Col md={12}>
            <div className="hproduct">Pending Order</div>
          </Col>
        </Row>
        <Row className="jcenter filterrow wsdw">
          <Col md={5} className="wrapw223">
            <div className="pednin">
              <img src={pending} className="pending" alt="pending" />
            </div>
            <div className="ordertext2">
              Your order has been logged and payment would be confirmed within
              24hrs of placing the order.
            </div>
            <div className="Continue">
              <Link to="/dashboard">Continue</Link>
            </div>
          </Col>
        </Row>
        <Footer />
      </Container>
    </>
  );
};

export default OrderSuccess;
