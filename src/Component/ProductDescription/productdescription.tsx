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
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Axios from "axios";
import { css } from "glamor";
import { API } from "../../config";

type State = {
  numberofbarrels: any | string;
  orderFor: string;
  show: boolean;
  success: string;
  isloggedIn: boolean;
  amountperbarrel: number;
  product: string;
  rate: number;
  errorMessage: string;
  sponsorFirstname: string;
  sponsorLastName: string;
  sponsorEmail: string;
  isloading: boolean;
};
const ProductDescription: React.FC = (props: any) => {
  const [state, setNewState] = useState<State>({
    numberofbarrels: 1,
    orderFor: "",
    show: false,
    success: "",
    isloggedIn: false,
    amountperbarrel: 1000,
    product: "",
    rate: 25,
    errorMessage: "",
    sponsorFirstname: "",
    sponsorLastName: "",
    sponsorEmail: "",
    isloading: false,
  });
  const { product, rate, amountperbarrel, numberofbarrels }: any = state;
  React.useEffect(() => {
    window.scrollTo(-0, -0);
    const productId = props.match.params.id;
    localStorage.setItem("productId", JSON.stringify(productId)); //save the product id so we orders can be returned back to this point when cancelled
    const userInfo: any = localStorage.getItem("userDetails");
    const token = JSON.parse(userInfo);
    console.log(token);
    Axios.get(`${API}/api/v1/products/${productId}`, {
      headers: { Authorization: `Bearer ${token.token}` },
    })
      .then((res) => {
        console.log(res);
        if (res.data.responseStatus === 200) {
          setNewState({
            ...state,
            product: res.data.product,
            amountperbarrel: res.data.product.price,
            rate: res.data.product.return,
          });
        }
        if (res.data.responseStatus == 400) {
          props.history.push("/products");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const onchange = (e) => {
    setNewState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };
  const placeOrderForProduct = () => {
    setNewState({
      ...state,
      isloading: true,
    });
    const userInfo: any = localStorage.getItem("userDetails");
    const token = JSON.parse(userInfo);
    const productId = props.match.params.id;
    const data = {
      units: state.numberofbarrels,
    };
    Axios.post(`${API}/api/v1/products/${productId}/order`, data, {
      headers: { Authorization: `Bearer ${token.token}` },
    })
      .then((res) => {
        console.log(res);
        if (res.data && res.data.responseStatus === 307) {
          setNewState({
            ...state,
            isloading: false,
          });
          return notify(res.data.responseMessage, "B");
        }
        if (res.data && res.data.order.paymentType == "manual") {
          setNewState({
            ...state,
            isloading: false,
          });
          return notify(res.data.order.message, "A");
        }
        if (res.data && res.data.responseStatus === 400) {
          setNewState({
            ...state,
            isloading: false,
          });
          return notify(res.data.responseMessage, "B");
        }
        if (res.data && res.data.responseStatus === 200) {
          localStorage.setItem("orderDetails", JSON.stringify(res.data));
          localStorage.setItem("orderDetailsProfile", JSON.stringify(res.data));
          setTimeout(() => {
            props.history.push("/completeorder");
          }, 3000);
          setNewState({
            ...state,
            isloading: false,
          });
          notify("Successfull", "A");
        }
      })
      .catch((err) => {
        notify("Order Failed!", "B");
        console.log(err.response);
        setNewState({
          ...state,
          isloading: false,
        });
      });
  };
  const notifySuccess = (successMessage) => {
    toast(successMessage, {
      position: toast.POSITION.TOP_CENTER,
      className: css({
        background: "#43A047",
        borderRadius: "2rem",
        padding: "1rem 1.5rem",
      }),
      bodyClassName: css({
        fontSize: "17px",
        color: "white",
      }),
      progressClassName: css({
        background:
          "repeating-radial-gradient(circle at center, red 0, blue, green 30px)",
      }),
    });
  };
  const notifyFailedOrder = (text) => {
    toast(text, {
      position: toast.POSITION.TOP_CENTER,
      className: css({
        background: "#e74c3c",
        borderRadius: "2rem",
        padding: "1rem 1.5rem",
      }),
      bodyClassName: css({
        fontSize: "17px",
        color: "white",
      }),
      progressClassName: css({
        background:
          "repeating-radial-gradient(circle at center, red 0, blue, green 30px)",
      }),
    });
  };
  const notifyFailedOrder1 = (text) => {
    toast(text, {
      position: toast.POSITION.TOP_CENTER,
      className: css({
        background: "#e74c3c",
        borderRadius: "2rem",
        padding: "1rem 1.5rem",
      }),
      bodyClassName: css({
        fontSize: "17px",
        color: "white",
      }),
      progressClassName: css({
        background:
          "repeating-radial-gradient(circle at center, red 0, blue, green 30px)",
      }),
    });
  };
  //if profile is incomplete this is called
  const notifyFailedOrder2 = (text) => {
    toast(text, {
      position: toast.POSITION.TOP_CENTER,
      className: css({
        background: "#e74c3c",
        borderRadius: "2rem",
        padding: "1rem 1.5rem",
      }),
      bodyClassName: css({
        fontSize: "17px",
        color: "white",
      }),
      progressClassName: css({
        background:
          "repeating-radial-gradient(circle at center, red 0, blue, green 30px)",
      }),
      onClose: () => {
        props.history.push("/profilesettings");
      },
    });
  };
  const capitalizeFirstLetter = (string) => {
    if (string) return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const ReserveForProduct = () => {
    setNewState({
      ...state,
      isloading: true,
    });
    const user: any = localStorage.getItem("userDetails");
    const productId: any = props.match.params.id;
    const user_id = JSON.parse(user);
    var token = user_id.token;
    const data = {
      units: state.numberofbarrels,
    };
    Axios.post(`${API}/api/v1/products/${productId}/reserve`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.data.responseStatus === 400) {
          notify(res.data.responseMessage, "B");
          setNewState({
            ...state,
            isloading: false,
          });
        }
        if (res.data.responseStatus === 200) {
          notify("Reservation Successfull!", "A");
          setNewState({
            ...state,
            isloading: false,
          });
          setTimeout(() => {
            props.history.push("/dashboardproducts");
          }, 2000);
        }
      })
      .catch((err) => {
        notify("Failed to reserve", "B");
        // console.log(err.response)
        setNewState({
          ...state,
          isloading: false,
        });
      });
  };
  const payBackCalculation = () => {
    let total: any = (rate * numberofbarrels * amountperbarrel) / 100;
    let sponsorship: any =
      parseInt(amountperbarrel) * parseInt(numberofbarrels);
    let totalPayback = parseInt(total) + parseInt(sponsorship);
    console.log(totalPayback);
    return { totalPayback, total, sponsorship };
  };
  const {
    show,
    success,
    errorMessage,
    sponsorEmail,
    sponsorFirstname,
    sponsorLastName,
  }: any = state;
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
  };
  const handleIncrease = () => {
    setNewState({
      ...state,
      numberofbarrels: numberofbarrels > 0 ? parseInt(numberofbarrels) + 1 : "",
    });
  };
  const handleClose = () => {
    setNewState({
      ...state,
      show: false,
    });
  };
  const notify = (message: string, container = "A") =>{
    toast(message, { containerId: container });
  }
    
  const handleShow = () => {
    setNewState({
      ...state,
      show: true,
    });
  };
  const FormatAmount = (amount) => {
    return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const calculateReturnAmount = (price: number, rate: number): any => {
    if (price && rate) {
      const payBack = price + price * (rate / 100);
      console.log(payBack);
      return FormatAmount(payBack);
    }
  };
  console.log(product);
  return (
    <>
      <NavBar />
      <Container fluid={true} className="push">
        <ToastContainer
          enableMultiContainer
          containerId={"B"}
          toastClassName="bg-info text-white"
          hideProgressBar={true}
          position={toast.POSITION.TOP_CENTER}
        />
        <Row className="jcenter graybg">
          <Col md={10} className="nopaddin">
            <div className="policyh text-center">Product Detail</div>
          </Col>
        </Row>
        <Row className="jcenter">
          <Col md={10} className="padin01">
            <Row className="padin01 k122">
              <Col md={6} className="six11 imgcontainer">
                <img src={slide11} className="slide11" alt="slide11" />
              </Col>
              <Col md={6}>
                <div className="producttile1">
                  <span className="prodname">{product?.name}</span>
                  <div
                    className={
                      capitalizeFirstLetter(product.status) === "Loaded"
                        ? "Loadedproductdesc"
                        : capitalizeFirstLetter(product.status) === "Finished"
                        ? "finished11productdesc"
                        : "Loadingproductdesc"
                    }
                  >
                    {" "}
                    <span
                      className={
                        capitalizeFirstLetter(product.status) === "Loaded"
                          ? "greencircleproductdesc"
                          : capitalizeFirstLetter(product.status) === "Finished"
                          ? "redcircleproductdesc"
                          : "yellowcircleproductdesc"
                      }
                    ></span>{" "}
                    {capitalizeFirstLetter(product.status)}
                  </div>
                </div>
                <div className="pricearea">
                  <div className="buyattext">
                    Buy at
                    <span className="buyatprice">
                      ₦{FormatAmount(payBackCalculation().sponsorship)}
                    </span>
                  </div>
                  <div className="buyattext">
                    Sell at{" "}
                    <span className="buyatprice">
                      {" "}
                      ₦{FormatAmount(payBackCalculation().totalPayback)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="buyattext">
                    {product?.return}% in {product?.cycle}{" "}
                    {product?.cycle === 1 ? "month" : "months"}
                  </div>
                </div>
                <hr />
                <div className="prod133">
                  <div className="d22">
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
                  </div>
                  <div className="d22">
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
                </div>
                <div className="textrift">
                  {capitalizeFirstLetter(product?.status) === "Loaded" ? (
                    <div className="placeorder" onClick={placeOrderForProduct}>
                      ORDER
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="textrift">
                  {capitalizeFirstLetter(product?.status) === "Loading" ? (
                    <div className="placeorder" onClick={ReserveForProduct}>
                      Reserve
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </Col>
            </Row>
          </Col>
          <Col md={10} className="prosd">
            <div className="proddesctit">Product Description</div>
            <hr />
            <div className="popular">{product.description}</div>
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
        <ToastContainer
          enableMultiContainer
          containerId={"B"}
          toastClassName="bg-danger text-white"
          hideProgressBar={true}
          position={toast.POSITION.TOP_CENTER}
        />
        <ToastContainer
          enableMultiContainer
          containerId={"A"}
          toastClassName="bg-success text-white"
          hideProgressBar={true}
          position={toast.POSITION.TOP_CENTER}
        />
        <GetMobileApp />
        <Footer />
      </Container>
    </>
  );
};

export default ProductDescription;