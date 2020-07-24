import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import "./sponsor.css";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import dashcenter from "../../assets/dashcenter.svg";
import moment from "moment";
import Table from "react-bootstrap/Table";
import { API } from "../../config";
import "./Dashboard.css";
import Col from "react-bootstrap/Col";
import Axios from "axios";
import { render } from "@testing-library/react";

const renderTooltip = (props) => (
  <div
    {...props}
    style={{
      backgroundColor: "white",
      padding: "2px 10px",
      color: "black",
      fontSize: "13px",
      borderRadius: 3,
      width: "120px",
      ...props.style,
    }}
  >
    To see actual return you have to login or create an account
  </div>
);

//change dateformat
const startDate = (date) => {
  //change end of cycle date
  if (date) {
    console.log(date);
    const trueDate = new Date(date);
    return moment(date).fromNow();
  }
  if (!date) {
    return "n/a";
  }
};

class PurchaseSummary extends Component {
  state: any = {
    user: "",
    products: "",
    errorMessage: "",
    isloading: false,
    visible: 5,
  };

  //capitalize first letter
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  componentDidMount() {
    this.setState({
      isloading: true,
    });
    //fetch user info
    const loggedIn = sessionStorage.getItem("adminDetails");
    const userdata = loggedIn ? JSON.parse(loggedIn) : "";
    const token = loggedIn ? JSON.parse(loggedIn).token : "";
    axios
      .get(`${API}/api/v1/user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data.user.reservations);
        this.setState({
          products: res.data.user,
          isloading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          errorMessage: "Failed to load",
          isloading: false,
        });
      });
  }
  endOfCycle = (date) => {
    //change end of cycle date
    let todayDate = moment(date).format("Do MMM YYYY");
    if (date) {
      if (todayDate == "Invalid date") {
        let todayDate = moment(date).format("Do MMM YYYY");
        return null;
      }
      if (todayDate && todayDate !== "Invalid date") {
        let todayDate = moment(date).format("Do MMM YYYY");
        return todayDate;
      }
    }
    if (date === "") {
      let todayDate = moment(date).format("Do MMM YYYY");
      return " ";
    }
  };
  startDate = (paydate) => {
    //change end of cycle date
    let todayDate = moment(paydate).format("Do MMM YYYY");
    if (todayDate == "Invalid date") {
      let todayDate = moment(paydate).format("Do MMM YYYY");
      return null;
    }
    if (todayDate && todayDate !== "Invalid date") {
      let todayDate = moment(paydate).format("Do MMM YYYY");
      console.log(todayDate);
      return todayDate;
    }
    // if(date===''){
    // let todayDate =  moment(date).format("Do MMM YYYY")
    //     return(" ")
    // }
  };

  //LOADMORE HANDLER
  loadMore = () => {
    this.setState((prev: any) => {
      return { visible: prev.visible + 5 };
    });
  };
  componentWillMount() {
    window.scrollTo(-0, -0);
    //fetch user info
    const loggedIn = localStorage.getItem("userDetails");
    const userdata = loggedIn ? JSON.parse(loggedIn) : "";
    if (!userdata) {
      return window.location.assign("/signin");
    }
    const token = loggedIn ? JSON.parse(loggedIn).token : "";
    axios
      .get(`${API}/api/v1/user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        if (res.data.responseStatus === 200) {
          return this.setState({
            user: res.data.user,
            isverified: res.data.user.verified,
          });
        }
        if (!res.data.user.verified) {
          return window.location.assign("/verify-account");
        }
        if (res.data.responseStatus === 401) {
          localStorage.clear();
          return window.location.assign("/signin");
        }
      })
      .catch((err) => {
        // console.log(err)
        this.setState({
          errorMessage: "Failed to load try again later",
        });
      });
  }

  render() {
    const { user, products, isloading, errorMessage }: any = this.state;
    const loading = "#FFBF00";
    const finished = "#9B0000";
    const loaded = "rgb(67,160,71)";
    const green = "rgb(67,160,71)";
    return (
      <Row className=" nosponsor-transaction  product-list-wrapper1 transaction-table">
        {isloading ? (
          <div className="spinner-products loadingproduct">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading</span>
            </Spinner>
          </div>
        ) : (
          ""
        )}
        {false && (
          <Col md={12} className="modea nopad11">
            <div className="midcontent2">
              <img src={dashcenter} className="dashcenter" alt="dashcenter" />
              <div className="noactivities">No Activities</div>
              <div>
                You currently have no active sponsorship activity. Explore our
                exciting opportunities to get started.
              </div>
              <div className="exploreprod">
                <Link to="/products">EXPLORE PRODUCTS</Link>
              </div>
            </div>
          </Col>
        )}
        {true && (
          <Table responsive>
            <thead>
              <tr>
                <th className="tablehead">S/N</th>
                <th className="tablehead">Product Name</th>
                <th className="tablehead">Units</th>
                <th className="tablehead">Payment Date</th>
                <th className="tablehead">End Of Cycle Day</th>
                <th className="tablehead">Purchase Cost</th>
                <th className="tablehead">Return</th>
                <th className="tablehead">Total PayBack</th>
              </tr>
            </thead>
            <tbody>
              {user &&
                user.orders.length > 0 &&
                user.orders
                  .reverse()
                  .slice(0, this.state.visible)
                  .map((x, index) => (
                    <tr key={x.id} className="tdata">
                      <td>{++index}</td>
                      <td>{x.name}</td>
                      <td>{x.unitsBought}</td>
                      <td>{this.startDate(x.date ? x.date : x.date)}</td>
                      <td>{this.endOfCycle(x.cycleEndDate)}</td>
                      <td>
                        &#8358;
                        {x.totalPurchase
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </td>
                      <td>{x.return}%</td>
                      <td>
                        &#8358;
                        {x.returnAmount
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </Table>
        )}
        {/* {!isloading && errorMessage && this.state.products.length==0? <NoSponsor title={errorMessage}/>:'' }         */}
      </Row>
    );
  }
}

export default PurchaseSummary;
