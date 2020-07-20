import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBar from "../SubComponents/Navbar";
import "./Product.css";
import Footer from "../Home/Footer";
import GetMobileApp from "../Home/GetMobileApp";
import { useState } from "react";
import filter from "../../assets/filter.svg";
import Form from "react-bootstrap/Form";
import slide1 from "../../assets/slide1.png";
import "./animatedbutton.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import { API } from "../../config";

interface IAppProps {}

const Products: React.FunctionComponent<IAppProps> = (props: any) => {
  const [state, setNewState] = useState({
    products: "",
    filter: "",
    sortbyLoading: false,
    sortbyLoaded: false,
    sortbyFinished: false,
    errorMessage: "",
    clientIsLoggedIn: "",
    visible: 8,
    sortbyAll: false,
    isloading: false,
    sortbyLPG: false,
    sortbyfuel: false,
    sortbyAGO: false,
  });
  const handleSelectChange = (e) => {
    setNewState({
      ...state,
      filter: e.target.value,
    });
  };
  const {
    sortbyFinished,
    sortbyLoaded,
    clientIsLoggedIn,
    visible,
    isloading,
    errorMessage,
    sortbyLoading,
    products,
  }: any = state;
  React.useEffect(() => {
    window.scrollTo(-0, -0);
    const loggedIn = sessionStorage.getItem("userDetails");
    const clientdata = loggedIn ? JSON.parse(loggedIn) : "";
    setNewState({
      ...state,
      clientIsLoggedIn: clientdata,
    });
    window.scrollTo(-0, -0);
    setNewState({
      ...state,
      isloading: true,
    });
    Axios.get(`${API}/api/v1/products`)
      .then((res) => {
        setNewState({
          ...state,
          products: res.data.products,
          isloading: false,
        });
      })
      .catch((err) => {
        setNewState({
          ...state,
          isloading: false,
          errorMessage: "Failed To Load Products",
        });
      });
  }, []);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const FormatAmount = (amount) => {
    return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const loadMore = () => {
    setNewState((prev) => {
      return {
        ...prev,
        visible: prev.visible + 4,
      };
    });
  };
  //change dateformat
  return (
    <>
      <NavBar />
      <Container fluid={true} className="push">
        <Row className="titleArea">
          <Col md={12}>
            <div className="hproduct">Products</div>
          </Col>
        </Row>
        <Row className="jcenter filterrow">
          <Col md={10} className="filterwrap">
            <div>
              <img src={filter} className="filter" alt="filter" />{" "}
              <span className="filtertext">Filter By:</span>
            </div>
            <div className="prod12">
              <div className="select1">
                <Form.Control
                  as="select"
                  className="selecss loks"
                  onChange={handleSelectChange}
                >
                  <option value="">Status</option>
                  <option value="Pass">Loading</option>
                  <option value="Failed">Loaded</option>
                  <option value="Failed">Finished</option>
                </Form.Control>
              </div>
              <div className="select2">
                <Form.Control
                  as="select"
                  className="selecss loks"
                  onChange={handleSelectChange}
                >
                  <option value="">Type</option>
                  <option value="Pass">AGO</option>
                  <option value="Failed">CNG</option>
                </Form.Control>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="jcenter productwrapper1">
          <Col md={10} className="productlist">
            <div className="slidewrapperproduct">
              {products &&
                products.length > 0 &&
                products.slice(0, visible).map((x, index) => (
                  <div className="slide1wrapproduct">
                    <div className="finished1product">
                      <div
                        className={
                          capitalizeFirstLetter(x.status) === "Finished"
                            ? "finished11product"
                            : capitalizeFirstLetter(x.status) === "Loaded"
                            ? "Loadedproduct"
                            : "Loadingproduct"
                        }
                      >
                        {console.log(x)}
                        <span
                          className={
                            capitalizeFirstLetter(x.status) === "Finished"
                              ? "redcircleproduct"
                              : capitalizeFirstLetter(x.status) === "Loaded"
                              ? "greencircleproduct"
                              : "yellowcircleproduct"
                          }
                        ></span>{" "}
                        {capitalizeFirstLetter(x.status)}
                      </div>
                    </div>
                    <Link to="/product/2">
                      <img
                        src={x.imageUrl}
                        alt="slide1"
                        className="slide1product"
                      />
                    </Link>
                    <div className="slidetitleproduct">
                      <div>AGO-111</div>
                      <div>
                        <span className="buyatproduct">Buy at</span>
                        <span className="amountproduct">
                          ₦{FormatAmount(x.price)}
                        </span>
                        <div>
                          {/* <span className="buyatproduct">Sell at</span>
                          <span className="amountproduct">₦800,000</span> */}
                        </div>
                        <div className="buyatproduct textssproduct">
                          <div>
                            Returns &nbsp;
                            {x && !clientIsLoggedIn
                              ? x.returnRangefrom + "% -"
                              : ""}{" "}
                            {x && !clientIsLoggedIn
                              ? x.returnRangeto + "%"
                              : ""}{" "}
                            {clientIsLoggedIn && x ? x.return + "%" : ""}
                          </div>
                          <div>in {x ? x.cycle : ""} months</div>
                        </div>
                        <div className="slider22product">
                          <span className="rightarrw1product">View</span>
                          <span className="rightarrwproduct">&#8594;</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </Col>
          <Col md={10}>
            {visible < products.length &&
              !isloading &&
              !errorMessage &&
              products.length !== 0 && (
                <div className="btnwrapperload">
                  <a
                    className="loadmoreproducts animated-button thar-four"
                    onClick={loadMore}
                  >
                    Load more
                  </a>
                </div>
              )}
          </Col>
        </Row>
        <GetMobileApp />
        <Footer />
      </Container>
    </>
  );
};

export default Products;
