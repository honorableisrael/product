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

  render() {
    const { user, products, isloading, errorMessage } = this.state;
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
        {true && (
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
        {false && (
          <Table responsive>
            <thead>
              <tr>
                <th className="tablehead">S/N</th>
                <th className="tablehead">Product Name</th>
                <th className="tablehead">Units</th>
                <th className="tablehead">Payment Date</th>
                <th className="tablehead">End Of Cycle Day</th>
                <th className="tablehead">Purchase Cost</th>
                <th className="tablehead">Transaction Cost</th>
                <th className="tablehead">Return</th>
                <th className="tablehead">Total PayBack</th>
              </tr>
            </thead>
            <tbody></tbody>
          </Table>
        )}
        {/* {!isloading && errorMessage && this.state.products.length==0? <NoSponsor title={errorMessage}/>:'' }         */}
      </Row>
    );
  }
}

export default PurchaseSummary;
