import * as React from "react";
import NavBar from "../SubComponents/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import useraccount from "../../assets/avatar.png";
import "./Dashboard.css";
import SideBar from "./sidebar";
import RightSideBar from "./rightSideBar";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import MobileSideNav from "./MobileSideNav";
import Axios from "axios";
import { API } from "../../config";
import Modal from "react-bootstrap/Modal";

const DashboardSubaccountsConvert = (props: any) => {
  const [state, setFormState] = useState({
    errorMessage: "",
    email: "",
    accountname: "",
    accountnumber: "",
    bankname: "",
    password: "",
    passwordhide: true,
    show: false,
    isloading: false,
    user: "",
    products: "",
    barrelCost: "",
    visible: 6,
  });
  const {
    errorMessage,
    password,
    email,
    passwordhide,
    isloading,
    accountname,
    accountnumber,
    bankname,
  } = state;
  const convertToStandAlone = () => {
    const loggedIn = localStorage.getItem("userDetails");
    const userdata = loggedIn ? JSON.parse(loggedIn) : "";
    const token = loggedIn ? JSON.parse(loggedIn).token : "";
    const subaccountId: any = props.match.params.id;
    Axios.post(`${API}/sub-accounts/${subaccountId}/convert`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setFormState({
            ...state,
            isloading: false,
          });
          setTimeout(() => {
            props.history.push("/subaccountsuccess");
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err.response);
        if (err?.status === 400) {
          return setFormState({
            ...state,
            isloading: false,
            errorMessage:
              err?.data?.message || err?.data?.message || err?.data?.statusText,
          });
        }
      });
  };
  const onchange = (e) => {
    setFormState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };
  const handleClose = () =>
    setFormState({
      ...state,
      show: false,
    });
  const { user, products, barrelCost, visible, show }: any = state;
  React.useEffect(() => {
    const loggedIn = localStorage.getItem("userDetails");
    const userdata = loggedIn ? JSON.parse(loggedIn) : "";
    const token = loggedIn ? JSON.parse(loggedIn).token : "";
    const subaccountId: any = props.match.params.id;
    //load  product list
    Axios.get(`${API}/sub-accounts/${subaccountId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log(res);
        setFormState({
          ...state,
          user: res.data.data,
          isloading: false,
        });
        console.log(products);
      })
      .catch((err) => {
        console.log(err);
        setFormState({
          ...state,
          errorMessage: "Failed to Load Sub Account",
          isloading: false,
        });
      });
  }, []);
  const FormatAmount = (amount) => {
    return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const loadMore = () => {
    setFormState((prev) => {
      return {
        ...prev,
        visible: prev.visible + 4,
      };
    });
  };
  const handleShow = () =>
    setFormState({
      ...state,
      show: true,
    });
  return (
    <>
      <NavBar />
      <Container fluid={true} className="push">
        <Row className="dashrow">
          <SideBar subaccounts={true} />
          <Col md={10} className="mainbody11">
            <Row className="rowss">
              <MobileSideNav />
              <Col md={8} className="">
                <div className="sponsorsacc col-md-11">
                  <div className="backks">
                    <Link to="/dashboardsubaccounts" className="backksqq">
                      BACK TO SUB-ACCOUNTS
                    </Link>
                  </div>
                  <div className="viewsubinfo"></div>
                </div>
                <div className="suss131">
                  <div className="iosiis">
                    <div className="wnww">
                      <img
                        src={useraccount}
                        className="useraccount skkd"
                        alt="useraccount"
                      />
                      <div>
                        <div className="usernameo1">
                          {user?.subAccount?.first_name}{" "}
                          {user?.subAccount?.last_name}
                        </div>
                        <div className="em11">{user?.subAccount?.email}</div>
                      </div>
                    </div>
                    <div className="conveta" onClick={handleShow}>
                      Convert
                    </div>
                  </div>
                  <div>
                    <Form className="jjsus">
                      <div className="tite">Bank Details</div>
                      <Form.Group>
                        <h6 className="user12 iuusP">Account Name</h6>
                        <Form.Control
                          type="text"
                          value={accountname}
                          className="userfield"
                          id="accountname"
                          onChange={onchange}
                          placeholder=""
                        />
                        <i
                          className="fa fa-envelope field-right-icon"
                          aria-hidden="true"
                        ></i>
                      </Form.Group>
                      <Form.Group>
                        <h6 className="user12 iuusP">Account Number</h6>
                        <Form.Control
                          type="tel"
                          value={accountnumber}
                          className="userfield"
                          id="accountnumber"
                          onChange={onchange}
                          placeholder=""
                        />
                        <i
                          className="fa fa-envelope field-right-icon"
                          aria-hidden="true"
                        ></i>
                      </Form.Group>
                      <Form.Group>
                        <h6 className="user12 iuusP">Bank Name</h6>
                        <Form.Control
                          type="text"
                          value={bankname}
                          className="userfield"
                          id="bankname"
                          onChange={onchange}
                          placeholder=""
                        />
                        <i
                          className="fa fa-envelope field-right-icon"
                          aria-hidden="true"
                        ></i>
                      </Form.Group>
                    </Form>
                  </div>
                </div>
                <div>
                  <div className="prodpurchased">Products Purchased</div>
                  {products.length !== 0 && (
                    <Col md={12} className="productlist nopad11">
                      <div className="slidewrapperproduct redefine1">
                        {products &&
                          products?.length > 0 &&
                          products?.slice(0, visible)?.map((x, index) => (
                            <div className="slide1wrapdashboardproduct">
                              <div className="finished1product">
                                <div
                                  className={
                                    capitalizeFirstLetter(x.productStatus) ===
                                    "Loaded"
                                      ? "Loadeddashboardproduct"
                                      : capitalizeFirstLetter(
                                          x.productStatus
                                        ) === "Finished"
                                      ? "finished11dashboardproduct"
                                      : "Loadeddashboardproduct"
                                  }
                                >
                                  {console.log(x)}{" "}
                                  <span
                                    className={
                                      capitalizeFirstLetter(x.productStatus) ===
                                      "Finished"
                                        ? "redcircleproduct nomargin"
                                        : capitalizeFirstLetter(
                                            x.productStatus
                                          ) === "Loaded"
                                        ? "greencircleproduct  nomargin"
                                        : "yellowcircleproduct"
                                    }
                                    title="finished"
                                  ></span>
                                </div>
                              </div>
                              <img
                                src={x.imageUrl}
                                alt="slide1"
                                className="slide1product"
                              />
                              <div className="slidetitleproduct">
                                <div>AGO-111</div>
                                <div>
                                  <span className="buyatproduct">Buy at</span>
                                  <span className="amountproduct smalltext">
                                    &#8358;{FormatAmount(x.totalPurchase)}
                                  </span>
                                  <div>
                                    <span className="buyatproduct">
                                      Sell at
                                    </span>
                                    <span className="amountproduct smalltext">
                                      &#8358;{FormatAmount(x.returnAmount)}
                                    </span>
                                  </div>
                                  <div className="buyatproduct textssproduct"></div>
                                  <div className="slider22product">
                                    <span className="rightarrw1product">
                                      View
                                    </span>
                                    <span className="rightarrwproduct">
                                      &#8594;
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </Col>
                  )}
                </div>
                {/* <div>
                  <div className="prodpurchased prodda">Other Sub-Accounts</div>
                  <div className="othersubacct">
                    <img src={useraccount} className="avatr" alt="avatr" />
                    <div className="dpss">
                      <div className="msse">meet@email.com</div>
                      <div className="msse1">Adeshina Adedapo</div>
                      <div className="msse2">Convert</div>
                    </div>
                  </div>
                </div> */}
              </Col>
              <Modal show={show} centered={true} onHide={handleClose}>
                <div className="ssds1w">
                  <Modal.Header closeButton>
                    <Modal.Title className="mks1">
                      {" "}
                      <div>
                        <span className="mks2">CONFIRM CONVERT</span>{" "}
                      </div>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="congg">
                      Are you sure you want to make this account a standalone
                      account?
                    </div>
                    <div className="caaa">This action can't be undone</div>
                    <div className="dsdds">
                      <div className="continue1a" onClick={handleClose}>
                        <a className="continuelk">Back</a>
                      </div>
                      <div className="continueb" onClick={convertToStandAlone}>Continue</div>
                    </div>
                  </Modal.Body>
                </div>
              </Modal>
              <RightSideBar />
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default DashboardSubaccountsConvert;
