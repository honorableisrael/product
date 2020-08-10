import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import NavBar from "../SubComponents/Navbar";
import "../Products/Product.css";
import Footer from "../Home/Footer";
import GetMobileApp from "../Home/GetMobileApp";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import "./animatedbutton.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import { API } from "../../config";
import filecopy from "../../assets/filecopy.svg";

interface IAppProps {}

const CompleteOrder: React.FunctionComponent<IAppProps> = (props: any) => {
  const [state, setNewState] = useState({
    product: "",
    filter: "",
    clarityLink: "98282211298",
    hascopiedLink: false,
  });
  const [paymentState, setFormState] = useState({
    show: false,
    subject: "",
    message: "",
    errorMessage: "",
    success: "",
    isloading: false,
  });
  const FormatAmount = (amount) => {
    return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const { clarityLink, hascopiedLink } = state;
  const { product }: any = state;
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
  const changeCopiedState = () => {
    setNewState({
      ...state,
      hascopiedLink: true,
    });
    setTimeout(() => {
      setNewState({
        ...state,
        hascopiedLink: false,
      });
    }, 3000);
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
  useEffect(() => {
    // Axios.get(`${API}`)
    window.scrollTo(-0, -0);
    const getorder: any = localStorage.getItem("orderDetails");
    const orderproduct = JSON.parse(getorder);
    console.log(orderproduct);
    setNewState({
      ...state,
      product: orderproduct,
    });
  }, []);
  return (
    <>
      <NavBar />
      <Container fluid={true} className="push">
        <Row className="titleArea">
          <Col md={12}>
            <div className="hproduct">Complete Order</div>
          </Col>
        </Row>
        <Row className="jcenter filterrow wsdw">
          <Col md={5} className="wrapw">
            <div className="ordertext">
              Congratulations! You are one step closer to completing your
              payment. Please confirm your order
            </div>
            <div className="fleq1">
              <div className="flee head22">AGO-0013</div>
              {/* <div className="fke2">
                <div className="fke3 head22">Quantity</div>
                <div className="fke3">{product?.unitsBought}</div>
              </div> */}
              <div className="fke2">
                <div className="fke3 head22">Payment Amount</div>
                <div className="fke3">
                  ₦{FormatAmount(product?.totalPurchase)}
                </div>
              </div>
            </div>
          </Col>
          <Col md={12}>
            <Row className="jcenter">
              <Col md={5}>
                <div className="btnwwrap">
                  <div className="continue1">
                    <Link to={"/products"} className="continuelk">
                      Back
                    </Link>
                  </div>
                  <div className="continue" onClick={setShow}>
                    Continue
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Modal show={show} onHide={handleClose}>
          <div className="ssds1w">
            <Modal.Header closeButton>
              <Modal.Title className="mks1">
                {" "}
                <div>
                  <span className="mks2">Make Payment</span>{" "}
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="text-success messagetocrm"> {success}</p>
              <p className="text-danger messagetocrm"> {errorMessage}</p>
              <div className="dssc">
                <div className="amww">Payment Amount</div>
                <div className="amw1">
                  {" "}
                  ₦{FormatAmount(product?.totalPurchase)}
                </div>
              </div>
              <div className="amw12">
                Use your Internet/Mobile Banking platform from your bank to pay
                into this account number.
              </div>
              <div className="sddxx">
                <div>
                  <div className="sdaccount">
                    <div className="sweew">
                      Account Number
                      <div>
                        <div
                          onClick={() => {
                            navigator.clipboard.writeText(clarityLink);
                            changeCopiedState();
                          }}
                          className="copylink"
                          title="copy account number"
                        >
                          {hascopiedLink ? "Copied!" : "Copy"}
                          <img
                            src={filecopy}
                            className="filecopy"
                            alt="filecopy"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="greentesr">
                    {product?.paymentAccount?.account_number}
                  </div>
                </div>
                <div className="proca">
                  <div>
                    <div className="sdaccount">Bank</div>
                    <div className="greentesr">
                      {product?.paymentAccount?.bank}
                    </div>
                  </div>
                  <div>
                    <div className="sdaccount">Account Name</div>
                    <div className="greentesr">
                      {product?.paymentAccount?.account_name}
                    </div>
                  </div>
                </div>
                <div className="jsjc">
                  Ensure to save account details for easy reference for future
                  payments.
                </div>
                <div className="payna">
                  <span className="reec">
                    Enter reference code along with your transfer
                  </span>
                  <div className="refcode">{product?.orderReference}</div>
                </div>
              </div>
              <Col md={12}>
                <div className="btnwwrap btnwwrap2">
                  <div className="conform">
                    <Link to="/pendingsuccess">Confirm Payment</Link>
                  </div>
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

export default CompleteOrder;
