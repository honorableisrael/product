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
import preloader from "../../assets/preloader.gif";

const Products: React.FunctionComponent<any> = (props: any) => {
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

  //filter by status
  const handleSelectChange = (e) => {
    setNewState({
      ...state,
      filter: e.target.value,
    });
    filterProducts(e.target.value);
  };

  //filter by category
  const handleSelectChange2 = (e) => {
    setNewState({
      ...state,
      filter: e.target.value,
    });
    filterByProductType(e.target.value);
  };
  const {
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
      isloading: true,
      clientIsLoggedIn: clientdata,
    });
    window.scrollTo(-0, -0);
    setNewState({
      ...state,
      isloading: true,
    });
    Axios.get(`${API}/products`)
      .then((res) => {
        setNewState({
          ...state,
          isloading: false,
          products: res.data.data,
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
  const filterProducts = (filterby) => {
    Axios.get(`${API}/products/status/${filterby}`)
      .then((res) => {
        console.log(res);
        setNewState({
          ...state,
          products: res.data.data,
        });
      })
      .catch((err) => {});
  };
  const filterByProductType = (category) => {
    Axios.get(`${API}/products/category/${category}`)
      .then((res) => {
        console.log(res);
        setNewState({
          ...state,
          products: res.data.data,
        });
      })
      .catch((err) => {});
  };

  const calculateReturnAmount = (price: number, rate: number): any => {
    const payBack = price + price * (rate / 100);
    console.log(payBack);
    return FormatAmount(payBack);
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
        {isloading && (
          <div className="spinnnercenter">
            <img src={preloader} alt="preloader" />
          </div>
        )}
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
                  <option value="1">Loading</option>
                  <option value="2">Loaded</option>
                  <option value="3">Finished</option>
                </Form.Control>
              </div>
              <div className="select2">
                <Form.Control
                  as="select"
                  className="selecss loks"
                  onChange={handleSelectChange2}
                >
                  <option value="">Type</option>
                  <option value="1">AGO</option>
                  <option value="2">CNG</option>
                </Form.Control>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="jcenter productwrapper1">
          <Col md={10} className="productlist">
            <div className="slidewrapperproduct redefine1">
              {products &&
                !isloading &&
                products.length > 0 &&
                products.slice(0, visible).map((x, index) => (
                  <div className="slide1wrapproduct llml">
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
                    <Link to={`/product/${x.id}`}>
                      <img
                        src={x.imageUrl}
                        alt="slide1"
                        className="slide1product"
                      />
                    </Link>
                    <div className="slidetitleproduct">
                      <div className="linkaa1">
                        {" "}
                        <Link to={`/product/${x.id}`}>{x.name}</Link>
                      </div>
                      <div>
                        <span className="buyatproduct">Buy at</span>
                        <span className="amountproduct">
                          <Link to={`/product/${x.id}`}>
                            ₦{FormatAmount(x.price)}
                          </Link>
                        </span>
                        <div>
                          <span className="buyatproduct">Sell at</span>
                          <span className="amountproduct">
                            {" "}
                            <Link to={`/product/${x.id}`}>
                              ₦{calculateReturnAmount(x.price, x.return)}
                            </Link>
                          </span>
                          <div className="amm1 littf">
                            After {x.cycle} {x.cycle == 1 ? "month" : "months"}{" "}
                          </div>
                        </div>
                        <div className="slider22product">
                          <span className="rightarrw1product">
                            <Link to={`/product/${x.id}`}>View</Link>
                          </span>
                          <span className="rightarrwproduct">
                            {" "}
                            <Link to={`/product/${x.id}`}>&#8594;</Link>
                          </span>
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
