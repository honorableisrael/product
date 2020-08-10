import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Statistics.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import moment from "moment";
import Col from "react-bootstrap/Col";
import pramoprologo from "../../../assets/pramopro4.png";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { API } from "../../../config";

class Statistics extends Component {
  state = {
    date: new Date(),
    day: moment().day(),
    productStats: "",
    isloading: false,
  };

  componentDidMount() {
    console.log(this.props);
    this.setState({
      isloading: true,
    });
    const self: any = this;
    const loggedIn = sessionStorage.getItem("userDetails");
    const userdata = loggedIn ? JSON.parse(loggedIn) : "";
    const realtime = { newPath: "/realtime" };
    console.log(loggedIn);
    const token = loggedIn ? JSON.parse(loggedIn).token : "";
    // console.log(userdata.user.id)
    self.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    const self: any = this;
    clearInterval(self.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
    axios
      .get(`${API}/statistics/trade`)
      .then((res) => {
        console.log(res)
        this.setState({
          productStats: res.data ? res.data : null,
          isloading: false,
        });
      })
      .catch((err) => {
        // console.log(err)
        this.setState({
          isloading: false,
        });
      });
  }

  liveDates = () => {
   let date = this.state.date;
    if (date) {
      let todayDate: any = moment(date).format(" ddd, Do MMM YYYY");
      if (todayDate !== "Invalid date") {
        return todayDate;
      }
      if (todayDate !== "Invalid date") {
        return todayDate;
      }
    }
  };
  liveTime = () => {
   let date = this.state.date;
    if (date) {
      let todayDate = moment(date).format("h : mm : ss a");
      if (todayDate !== "Invalid date") {
        return todayDate;
      }
      if (todayDate !== "Invalid date") {
        return todayDate;
      }
    }
  };
  render() {
    const { productStats, isloading }:any = this.state;
    // console.log(this.state.productStats)
    const number = 0;
    return (
      <div>
        <Container>
          <Row className="admin-stats-wrapper">
            <Col md={12} sm={12} lg={12} className="firststatscol">
              <div className="firstwrapperstats">
                <Link to="/">
                  <img
                    src={pramoprologo}
                    className="logostats"
                    width="90"
                    height="50"
                    alt="pramoprologo"
                  />
                </Link>
                <div className="firststatsbox">
                  <div className="statscontent1">Live Stats</div>
                  <div className="statscontent2">
                    {this.liveDates()}
                    <div>{this.liveTime()}</div>
                  </div>
                </div>
              </div>
            </Col>
            <div className="secondstatsbox">
              <div className="ourtext">TOTAL TRADERS</div>
              <div className="ournumbers">
                {productStats
                  ? productStats.totalTraders
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : ""}
              </div>
              <div className="totalusersnumber">
                {productStats
                  ? productStats.totalUsers
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : ""}{" "}
                <span className="totalusers"> Total Users</span>
              </div>
            </div>
            <div className="secondstatsbox">
              <div className="ourtext">TOTAL UNITS PURCHASED</div>
              <div className="ournumbers">
                {productStats
                  ? productStats.totalUnitsPurchased
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : ""}
              </div>
              <div className="totalusersnumber">
                {productStats
                  ? productStats.totalProjects
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : ""}{" "}
                <span className="totalusers"> Total Projects</span>
              </div>
            </div>
            <div className="secondstatsbox">
              <div className="ourtext">TOTAL UNITS REMAINING</div>
              <div className="ournumbers">
                {productStats
                  ? productStats.totalUnitsRemaining
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : ""}
              </div>
              <div className="totalusersnumber">
                {productStats
                  ? productStats.totalProjects
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : ""}{" "}
                <span className="totalusers"> Total Projects</span>
              </div>
            </div>
            <div className="secondstatsbox">
              <div className="ourtextname">
                {productStats
                  ? productStats.valuePerProduct[0].name
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : ""}
              </div>
              <div className="ournumbers">
                {productStats
                  ? productStats.valuePerProduct[0].totalValue
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : ""}{" "}
                <span className="totalusers">Litres</span>
              </div>

              <div className="totalusersnumber borderlineclass">
                {productStats
                  ? productStats.unitsPurchasedPerProduct[0].units
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : ""}{" "}
                <span className="totalusers"> Units</span>
              </div>
            </div>
            <div className="secondstatsbox2">
              <div className="ourtextname">
                {productStats
                  ? productStats.valuePerProduct[5].name
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : ""}
              </div>
              <div className="ournumbers">
                {productStats
                  ? productStats.valuePerProduct[5].totalValue
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : ""}{" "}
                <span className="totalusers">Litres</span>
              </div>
              <div className="totalusersnumber borderlineclass">
                {productStats && productStats.unitsPurchasedPerProduct[5]
                  ? productStats.unitsPurchasedPerProduct[5].units
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : "0"}{" "}
                <span className="totalusers"> Units</span>
              </div>
            </div>
            <div className="secondstatsbox">
              <div className="ourtextname ">
                {productStats
                  ? productStats.valuePerProduct[1].name
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : ""}
              </div>
              <div className="ournumbers">
                {productStats
                  ? productStats.valuePerProduct[1].totalValue
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : ""}{" "}
                <span className="totalusers">Metric Tonnes</span>
              </div>
              <div className="totalusersnumber borderlineclass">
                {number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                <span className="totalusers">Units</span>
              </div>
            </div>
            <div className="secondstatsbox">
              <div className="ourtextname">
                {productStats
                  ? productStats.valuePerProduct[2].name
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : ""}
              </div>
              <div className="ournumbers">
                {productStats
                  ? productStats.valuePerProduct[2].totalValue
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : ""}{" "}
                <span className="totalusers">Litres</span>
              </div>
              <div className="totalusersnumber borderlineclass">
                {number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                <span className="totalusers"> Units</span>
              </div>
            </div>
            <div className="secondstatsbox">
              <div className="ourtextname">
                {productStats
                  ? productStats.valuePerProduct[3].name
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : ""}
              </div>
              <div className="ournumbers">
                {productStats
                  ? productStats.valuePerProduct[3].totalValue
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : ""}{" "}
                <span className="totalusers">Litres</span>
              </div>
              <div className="totalusersnumber borderlineclass">
                {number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                <span className="totalusers"> Units</span>
              </div>
            </div>
            <div className="secondstatsbox">
              <div className="ourtextname">
                {productStats
                  ? productStats.valuePerProduct[4].name
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : ""}
              </div>
              <div className="ournumbers">
                {productStats
                  ? productStats.valuePerProduct[4].totalValue
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : ""}{" "}
                <span className="totalusers">Litres</span>
              </div>
              <div className="totalusersnumber borderlineclass">
                {number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                <span className="totalusers"> Units</span>
              </div>
            </div>
          </Row>
          <Row>
            <div className="prevclass">
              <Link to="/realtime" style={{ color: "#444444" }}>
                <i className="fa fa-long-arrow-left"></i> Previous
              </Link>
            </div>
          </Row>
        </Container>
        {isloading && (
          <div className="isverified">
            <Spinner
              variant="success"
              animation="border"
              role="status"
            ></Spinner>
            <div className="loadingspinnerdashboard">Loading...</div>
          </div>
        )}
      </div>
    );
  }
}

export default Statistics;
