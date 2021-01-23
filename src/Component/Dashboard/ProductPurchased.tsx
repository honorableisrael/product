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
    visible: 12,
    token: "",
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
    Axios.get(`${API}/user/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setFormState({
          ...state,
          user: res.data.data,
          products: res.data.data,
          isloading: false,
          token: token,
        });
        console.log(res.data);
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
        visible: prev.visible + 6,
      };
    });
  };
  console.log(products);
  return (
    <>
      <Row className="refdark2">
        <Col md={12}>
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
                    <div className="slidewrapperproduct redefine1 redefine122">
                      {products &&
                        products?.length > 0 &&
                        products?.slice(0, visible)?.map((x, index) => (
                          <div className="slide1wrapdashboardproduct">
                            <div className="finished1product">
                              <div
                                className={
                                  x.orderStatus ===
                                  "on going"
                                    ? "Loadeddashboardproduct"
                                    : (
                                        x.orderStatus
                                      ) === "paid"
                                    ? "finished11dashboardproduct"
                                    : "Loadeddashboardproduct"
                                }
                              >
                                {console.log(x)}{" "}
                                <span
                                  className={
                                    x.orderStatus ===
                                    "paid"
                                      ? "redcircleproduct nomargin paid22"
                                      : (
                                          x.orderStatus
                                        ) === "on going"
                                      ? "greencircleproduct  nomargin paidgrn"
                                      : "yellowcircleproduct paid221"
                                  }
                                  title="Paid"
                                ></span>
                              </div>
                            </div>
                            <Link
                              to={`/dashboardreservedproducts/${x.product.id}/${x.id}`}
                            >
                              <img
                                src={x.product.imageUrl}
                                alt="slide1"
                                className="slide1product"
                              />
                            </Link>
                            <div className="slidetitleproduct">
                              <div>{x.name}</div>
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
                                  <span className="rightarrw1product"></span>
                                  <span className="rightarrwproduct">
                                    <a
                                      href={`${API}/orders/${x.id}/receipt`}
                                      target="blank"
                                    >
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
                    {visible < products?.length &&
                      !isloading &&
                      !errorMessage &&
                      products?.length !== 0 && (
                        <div className="text-center">
                          <div className="loadmore" onClick={loadMore}>
                            Load more
                          </div>
                        </div>
                      )}
                    {products.length === 0 && (
                      <div className="text-center ksk">
                        <Link to="/products">Explore Products</Link>
                      </div>
                    )}
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
