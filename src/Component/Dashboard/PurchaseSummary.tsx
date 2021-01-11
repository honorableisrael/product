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
import Pagination from "react-js-pagination";
// import "bootstrap/less/bootstrap.less";
import DataTable, { createTheme } from "react-data-table-component";

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
    visible: 10,
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
    const loggedIn = localStorage.getItem("userDetails");
    const userdata = loggedIn ? JSON.parse(loggedIn) : "";
    const token = loggedIn ? JSON.parse(loggedIn).token : "";
    axios
      .get(`${API}/transactions`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        this.setState({
          products: res.data.data,
          isloading: false,
        });
      })
      .catch((err) => {
        console.log(err.response);
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
      .get(`${API}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          return this.setState({
            user: res.data.data,
            isverified: res.data.data.verified,
          });
        }
        if (!res.data.data.verified) {
          return window.location.assign("/verify-account");
        }
      })
      .catch((err) => {
        if (err.status === 401) {
          localStorage.clear();
          return window.location.assign("/signin");
        }
        this.setState({
          errorMessage: "Failed to load try again later",
        });
      });
  }

  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  };
  render() {
    const {
      user,
      products,
      isloading,
      errorMessage,
      visible,
    }: any = this.state;
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
                <th className="tablehead">Payment Date</th>
                <th className="tablehead">End Of Cycle Day</th>
                <th className="tablehead">Purchase Cost</th>
                <th className="tablehead">Status</th>
                <th className="tablehead">Total PayBack</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.length > 0 &&
                products
                  .reverse()
                  .slice(0, this.state.visible)
                  .map((x, index) => (
                    <tr key={x.id} className="tdata">
                      <td>{++index}</td>
                      <td>{x.name}</td>
                      <td>
                        {this.startDate(
                          x.cycleStartDate ? x.cycleStartDate : x.cycleStartDate
                        )}
                      </td>
                      <td>{this.endOfCycle(x.cycleEndDate)}</td>
                      <td>
                        &#8358;
                        {x.totalPurchase
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </td>
                      {this.capitalizeFirstLetter(x.orderStatus) ==
                      "On going" ? (
                        <td className="completed1">Confirmed</td>
                      ) : this.capitalizeFirstLetter(x.orderStatus) ==
                        "Paid" ? (
                        <td className="completed1">Paid</td>
                      ) : this.capitalizeFirstLetter(x.orderStatus) ==
                        "Initiated" ? (
                        <td className="pending1">Pending</td>
                      ) : (
                        <td className="pending1">n/a</td>
                      )}

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
        {visible < products?.length &&
          !isloading &&
          !errorMessage &&
          products?.length !== 0 && (
            <div className="loadmore" onClick={this.loadMore}>
              Load more
            </div>
          )}
        {/* <div>
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={10}
            totalItemsCount={450}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
        </div> */}
        {/* {!isloading && errorMessage && this.state.products.length==0? <NoSponsor title={errorMessage}/>:'' }         */}
      </Row>
    );
  }
}

export default PurchaseSummary;
