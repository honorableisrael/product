import * as React from "react";
import NavBar from "../SubComponents/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../Products/Product.css";
import "./Dashboard.css";
import SideBar from "./sidebar";
import PersonalDetails from "./PersonalDetails";
import editprofilephoto from "../../assets/editprofilephoto.png";
import ContactDetails from "./ContactDetails";
import NOKDetails from "./NOKDetails";
import ProductPurchased from "./ProductPurchased";
import RightSideBar from "./rightSideBar";
import navigategreen from "../../assets/navigategreen.svg";
import slide2 from "../../assets/slide2.png";
import MobileSideNav from "./MobileSideNav";
import Switch from "react-switch";
import { useState } from "react";
import Axios from "axios";
import { API } from "../../config";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const DashboardReservedProductsDescription = (props: any) => {
  const [state, setState] = useState<any>({
    checked: false,
    product: "",
    user: [],
    order: [],
    canRollover: false,
    orderstatus: "",
  });
  const { product, checked, canRollover, order, orderstatus } = state;
  const handleChange = (checked) => {
    setState({
      ...state,
      checked,
    });
    if (checked) {
      setTimeout(() => {
        // notify("Purchas")
        props.history.push(`/products/${props.match.params.orderid}`);
      }, 2000);
    }
  };
  const notify = (message: string, container = "i") => {
    toast(message, { containerId: container });
  };

  console.log(checked);
  React.useEffect(() => {
    window.scrollTo(-0, -0);
    console.log(props);
    const productId = props.match.params.id;
    const orderId = props.match.params.orderid;

    localStorage.setItem("alreadyboughtproductid", JSON.stringify(orderId)); //save the product id so we orders can be returned back to this point when cancelled
    const userInfo: any = localStorage.getItem("userDetails");
    const token = userInfo
      ? JSON.parse(userInfo)
      : props.history.push("/signin");
    Axios.all([
      Axios.get(`${API}/products/${productId}`, {
        headers: { Authorization: `Bearer ${token?.token}` },
      }),
      Axios.get(`${API}/user/orders`, {
        headers: { Authorization: `Bearer ${token?.token}` },
      }),
    ])
      .then(
        Axios.spread((res, res1) => {
          console.log(res1.data.data);
          console.log(res.data);
          if (res1.status === 200 || res.status === 200) {
            res1?.data?.data?.forEach((element) => {
              console.log(element);
              if (props.match.params.orderid == element.id) {
                setState({
                  ...state,
                  canRollover: element.canRollover,
                  product: res.data.data,
                  user: res1.data,
                  order: element.orderStatus,
                });
              }
            });
          }
          if (res.status == 400) {
            props.history.push("/products");
          }
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const FormatAmount = (amount) => {
    if (amount) {
      return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  };
  const calculateReturnAmount = (price: number, rate: number): any => {
    if (price && rate) {
      const payBack = price + price * (rate / 100);
      return FormatAmount(payBack);
    }
  };

  console.log();
  console.log(product);
  return (
    <>
      <NavBar />
      <Container fluid={true} className="push">
        <Row className="dashrow">
          <SideBar products={true} />
          <Col md={6} className="mainbody11">
            <Row className="rowss">
              <MobileSideNav />
              <Col md={12}>
                <div className="sponsors backtoproducts">
                  <div className="PRODUCTS12">
                    <Link to={"/dashboardproducts"}>
                      <img src={navigategreen} alt="navigate" /> BACK TO
                      PRODUCTS
                    </Link>
                  </div>
                </div>
                <Col md={{ span: 12 }} className="userfirstitems-tabs nopad11">
                  <Col md={11}>
                    <div className="immgcont">
                      <img
                        src={product?.imageUrl}
                        className="dashproddescription"
                        alt="dashproddescription"
                      />
                    </div>
                  </Col>
                  <Col md={10} className="dashprod12">
                    <div className="prodflex">
                      <div className="flmx oill">
                        <div className="fott">{product.name}</div>
                        <div className="finished1product">
                          {order == "initiated" ? (
                            <div className="Loadedproduct rmrelpos">
                              {" "}
                              <span className="greencircleproduct"></span>{" "}
                              Initiated
                            </div>
                          ) : order == "on going" ? (
                            <div className="Loadedproduct rmrelpos">
                              {" "}
                              <span className="greencircleproduct"></span>{" "}
                              Ongoing
                            </div>
                          ) : order == "paid" ? (
                            <div className="Loadedproduct rmrelpos paid22">
                              {" "}
                              <span className="greencircleproduct paid221"></span>{" "}
                              Paid
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="flmx">
                        <div>
                          <span className="Buyat">Bought at</span>{" "}
                          <span className="priceb">
                            N{FormatAmount(product.price)}
                          </span>
                        </div>
                        <div>
                          <span className="Buyat">Selling at</span>
                          <span className="prices">
                            {" "}
                            N
                            {calculateReturnAmount(
                              product.price,
                              product.return
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="durr1 Buyat">
                        After {product.cycle}{" "}
                        {product.cycle == 1 ? "month" : "months"}{" "}
                      </div>
                      <div className="durr1 durr22">
                        <div className="durr21">
                          <div className="rolla">Roll Over Next Payment</div>
                          {canRollover && (
                            <Switch
                              onChange={handleChange}
                              checked={state.checked}
                              uncheckedIcon={false}
                              checkedIcon={false}
                              disabled={canRollover ? false : true}
                              height={18}
                              width={35}
                              onHandleColor={""}
                            />
                          )}
                          {!canRollover && (
                            <span
                              title={"You cannot not rollover payment now"}
                              onClick={() =>
                                notify(
                                  "Trade can only be rolled over 14 days to cycle end date.",
                                  "i"
                                )
                              }
                            >
                              <Switch
                                onChange={handleChange}
                                checked={state.checked}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                disabled={canRollover ? false : true}
                                height={18}
                                width={35}
                                onHandleColor={""}
                              />
                            </span>
                          )}
                        </div>
                      </div>
                      <hr />
                      <div className="prod133 pushsw">
                        <div className="prodname fott">Product Description</div>
                        <div className="descrp">{product.description}</div>
                      </div>
                    </div>
                  </Col>
                </Col>
              </Col>
            </Row>
          </Col>
          <RightSideBar bg={"#FAFAFA"} />
        </Row>
        <ToastContainer
          enableMultiContainer
          containerId={"i"}
          toastClassName="bg-info text-white"
          hideProgressBar={true}
          position={toast.POSITION.TOP_CENTER}
        />
      </Container>
    </>
  );
};
export default DashboardReservedProductsDescription;
