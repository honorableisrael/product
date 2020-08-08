import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Dashboard.css";
import dashcenter from "../../assets/dashcenter.svg";
import Form from "react-bootstrap/Form";
import RightSideBar from "./rightSideBar";
import slide1 from "../../assets/slide1.png";
import Products from "../Products/Product";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Axios from "axios";
import { API } from "../../config";
import download from "../../assets/download.png";

const ProductPurchased = () => {
  const [state, setFormState] = React.useState({
    user: "",
    products: "",
    barrelCost: "",
    errorMessage: "",
    visible: 6,
    token:"",
    isloading: false,
  });
  const {
    user,
    products,
    barrelCost,
    errorMessage,
    visible,
    isloading,
  }: any = state;
  const onchange = (e: any) => {
    setFormState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };
  useEffect(() => {
    const loggedIn = localStorage.getItem("userDetails");
    const userdata = loggedIn ? JSON.parse(loggedIn) : "";
    const token = loggedIn ? JSON.parse(loggedIn).token : "";
    //load  product list
    Axios.get(`${API}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setFormState({
          ...state,
          user:res.data.data,
          products: res.data.data.orders.reverse(),
          isloading: false,
          token:token,
        });
        console.log(products);
      })
      .catch((err) => {
        console.log(err);
        setFormState({
          ...state,
          errorMessage: "Failed to load Products",
          isloading: false,
        });
      });
  }, []);
  const FormatAmount = (amount) => {
    if (amount) {
      return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  };
  const capitalizeFirstLetter = (string) => {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  };
  const loadMore = () => {
    setFormState((prev) => {
      return {
        ...prev,
        visible: prev.visible + 4,
      };
    });
  };
  console.log(user)
  return (
    <>
      <Row className="refdark2">
        <Col md={10}>
          <Form>
            <Row>
              <Col md={12} className="modea nopad11">
                {products.length === 0 && (
                  <div className="midcontent2">
                    <img
                      src={dashcenter}
                      className="dashcenter"
                      alt="dashcenter"
                    />
                    <div className="noactivities">No Activities</div>
                    <div>
                      You currently have no active sponsorship activity. Explore
                      our exciting opportunities to get started.
                    </div>
                    <div className="exploreprod">EXPLORE PRODUCTS</div>
                  </div>
                )}
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
                                    : capitalizeFirstLetter(x.productStatus) ===
                                      "Finished"
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
                              src={slide1}
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
                                  <span className="buyatproduct">Sell at</span>
                                  <span className="amountproduct smalltext">
                                    &#8358;{FormatAmount(x.returnAmount)}
                                  </span>
                                </div>
                                <div className="buyatproduct textssproduct"></div>
                                <div className="slider22product">
                                  <span className="rightarrw1product">
                                    
                                  </span>
                                  <span className="rightarrwproduct">
                                  <a href={`${API}/user/${user.user_id}/orders/${x.id}/receipt`}>
                                    <img
                                      src={download}
                                      className="download"
                                      alt="download"
                                      title={"Download Reciept"}
                                      width={"14px"}
                                    />
                                    </a>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                    <div className="text-center ksk">
                      <Link to="/products">Explore Products</Link>
                    </div>
                  </Col>
                )}
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ProductPurchased;
