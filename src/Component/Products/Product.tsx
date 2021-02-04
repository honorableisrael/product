import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Product.css";
import { useState } from "react";
import filter from "../../assets/filter.svg";
import Form from "react-bootstrap/Form";
import shoe from "../../assets/shoe1.jpg";
import "./animatedbutton.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import { API } from "../../config";
import preloader from "../../assets/preloader.gif";
import brownshoe from "../../assets/brownshoe.jpg";
import nextImg from "../../assets/rightarrow.png";
import prevpage from "../../assets/leftarrow1.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Products: React.FunctionComponent<any> = (props: any) => {
  const [state, setNewState] = useState({
    products: [{ name: "Shoes", id: 1 }],
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

  const notify = (message: string) => toast(message, { containerId: "B" });
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

  //change dateformat
  return (
    <>
      <Container fluid={true} className="push">
        <Row className="titleArea">
          <Col md={12}>
            <div className="hproduct">Shoes</div>
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
                  <option value="1">Brown</option>
                  <option value="2">Black</option>
                  <option value="3">Navy blue</option>
                </Form.Control>
              </div>
              <div className="select2">
                <Form.Control
                  as="select"
                  className="selecss loks"
                  onChange={handleSelectChange2}
                >
                  <option value="">Sort by</option>
                  <option value="1">New</option>
                  <option value="2">Old</option>
                </Form.Control>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="jcenter productwrapper1">
          <Col md={12} className="productlist">
            <div className="slidewrapperproduct redefine1">
              <div className="productwrapper">
                <div className="prodimage">
                  <img src={shoe} className="prod1" />
                </div>
                <div className="product-item">
                  <div className="jmaes2">
                    J.M Weston Touble Tassel Semi Patterned Men's Shoes
                  </div>
                  <div className="price">₦{FormatAmount(35999)}</div>
                  <div className="text-right">
                    <span
                      className="bitt"
                      onClick={() => notify("Added successfully")}
                    >
                      ADD TO CART
                    </span>
                  </div>
                </div>
              </div>
              <div className="productwrapper">
                <div className="prodimage">
                  <img src={shoe} className="prod1" />
                </div>
                <div className="product-item">
                  <div className="jmaes2">J.M Weston Double Leather</div>
                  <div className="price">₦{FormatAmount(35999)}</div>
                  <div className="text-right">
                    <span
                      className="bitt"
                      onClick={() => notify("Added successfully")}
                    >
                      ADD TO CART
                    </span>
                  </div>
                </div>
              </div>
              <div className="productwrapper">
                <div className="prodimage">
                  <img src={brownshoe} className="prod1" />
                </div>
                <div className="product-item">
                  <div className="jmaes2">
                    J.M Weston Touble Tassel Semi Shoes
                  </div>
                  <div className="price">₦{FormatAmount(35999)}</div>
                  <div className="text-right">
                    <span
                      className="bitt"
                      onClick={() => notify("Added successfully")}
                    >
                      ADD TO CART
                    </span>
                  </div>
                </div>
              </div>
              <div className="productwrapper">
                <div className="prodimage">
                  <img src={brownshoe} className="prod1" />
                </div>
                <div className="product-item">
                  <div className="jmaes2">
                    J.M Weston Touble Tassel Semi Shoes
                  </div>
                  <div className="price">₦{FormatAmount(35999)}</div>
                  <div className="text-right">
                    <span
                      className="bitt"
                      onClick={() => notify("Added successfully")}
                    >
                      ADD TO CART
                    </span>
                  </div>
                </div>
              </div>
              <div className="productwrapper">
                <div className="prodimage">
                  <img src={shoe} className="prod1" />
                </div>
                <div className="product-item">
                  <div className="jmaes2">
                    J.M Weston Touble Tassel Semi Patterned Men's Shoes
                  </div>
                  <div
                    className="price"
                    onClick={() => notify("Added successfully")}
                  >
                    ₦{FormatAmount(35999)}
                  </div>
                  <div className="text-right">
                    <span className="bitt">ADD TO CART</span>
                  </div>
                </div>
              </div>
              <div className="productwrapper">
                <div className="prodimage">
                  <img src={shoe} className="prod1" />
                </div>
                <div className="product-item">
                  <div className="jmaes2">J.M Weston Double Leather</div>
                  <div
                    className="price"
                    onClick={() => notify("Added successfully")}
                  >
                    ₦{FormatAmount(35999)}
                  </div>
                  <div className="text-right">
                    <span className="bitt">ADD TO CART</span>
                  </div>
                </div>
              </div>
              <div className="productwrapper">
                <div className="prodimage">
                  <img src={brownshoe} className="prod1" />
                </div>
                <div className="product-item">
                  <div className="jmaes2">
                    J.M Weston Touble Tassel Semi Shoes
                  </div>
                  <div className="price">₦{FormatAmount(35999)}</div>
                  <div className="text-right">
                    <span className="bitt">ADD TO CART</span>
                  </div>
                </div>
              </div>
              <div className="productwrapper">
                <div className="prodimage">
                  <img src={brownshoe} className="prod1" />
                </div>
                <div className="product-item">
                  <div className="jmaes2">
                    J.M Weston Touble Tassel Semi Shoes
                  </div>
                  <div
                    className="price"
                    onClick={() => notify("Added successfully")}
                  >
                    ₦{FormatAmount(35999)}
                  </div>
                  <div className="text-right">
                    <span className="bitt">ADD TO CART</span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col md={10}>
            <div className="next_page">
              <div>
                Displaying <span className="page_num">1</span> out of{" "}
                <span className="page_num">1</span>
              </div>
              <div>
                {true && (
                  <img
                    className="page_change"
                    src={prevpage}
                    alt="previous page"
                  />
                )}

                {true && (
                  <img className="page_change" src={nextImg} alt="next page" />
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer
        enableMultiContainer
        containerId={"B"}
        toastClassName="bg-info text-white"
        hideProgressBar={true}
        position={toast.POSITION.TOP_CENTER}
      />
    </>
  );
};

export default Products;
