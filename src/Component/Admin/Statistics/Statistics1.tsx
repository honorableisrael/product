import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Statistics.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import moment from "moment";
import Col from "react-bootstrap/Col";
import axios from "axios";
import pramoprologo from "../../../assets/pramopro4.png";
import Spinner from "react-bootstrap/Spinner";
import { API } from "../../../config";

class Statistics1 extends Component {
  state = {
    date: new Date(),
    day: moment().day(),
    productStats: "",
    isloading: false,
  };

  componentDidMount() {
    const self: any = this;
    this.setState({
      isloading: true,
    });
    const loggedIn = sessionStorage.getItem("userDetails");
    const userdata = loggedIn ? JSON.parse(loggedIn) : "";
    const realtime = { newPath: "/realtime" };
    self.timerID = setInterval(() => self.tick(), 1000);
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
      .get(`${API}/statistics/product/units`)
      .then((res) => {
        console.log(res)
        this.setState({
          productStats: res.data,
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
    const { productStats, isloading }: any = this.state;
    // console.log(this.state.productStats)
    const number = 2000000;
    return (
      <div>
        <Container>
          <Row className="admin-stats-wrapper">
            <Col md={12} sm={12} lg={12} className="firststatscol">
              <div className="firstwrapperstats">
                <Link to="/">
                  {" "}
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
            <Row className="blockcontent">
              <Col md={{ offset: 2 }}>
                <div
                  className="secondstatsboxwhite11"
                  style={{ width: "max-content" }}
                >
                  <div className="ourcash">Total Collection</div>
                  <div
                    className="totalusersnumber1"
                    style={{ fontSize: "100px" }}
                  >
                    &#8358;{" "}
                    {productStats
                      ? productStats.totalMoney
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      : ""}
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="admin-stats-wrapper11">
              <div className="secondstatsbox">
                <div className="ournumbers">AGO</div>
                <div className="totalusers">
                  {productStats
                    ? productStats.agoUnitsLeft
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : ""}{" "}
                  <span className="totalusers">Units Left</span>
                </div>
              </div>
              <div className="secondstatsbox">
                <div className="ournumbers">CNG</div>
                <div className="totalusers">
                  {productStats && productStats.cngUnitsLeft
                    ? productStats.cngUnitsLeft
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : "0"}{" "}
                  <span className="totalusers">Units Left</span>
                </div>
              </div>
              <div className="secondstatsbox">
                <div className="ournumbers ">LPG</div>
                <div className="totalusers">
                  {productStats && productStats.lpgUnitsLeft
                    ? productStats.lpgUnitsLeft
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : ""}{" "}
                  <span className="totalusers">Units Left</span>
                </div>
              </div>
              <div className="secondstatsbox">
                <div className="ournumbers">DPK</div>
                <div className="totalusers">
                  {productStats
                    ? productStats.dpkUnitsLeft
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : ""}{" "}
                  <span className="totalusers">Units Left</span>
                </div>
              </div>
              <div className="secondstatsbox">
                <div className="ournumbers">HHK</div>
                <div className="totalusers">
                  {productStats
                    ? productStats.hhkUnitsLeft
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : ""}{" "}
                  <span className="totalusers">Units Left</span>
                </div>
              </div>
              <div className="secondstatsbox">
                <div className="ournumbers ">LPFO</div>
                <div className="totalusers">
                  {productStats
                    ? productStats.lpfoUnitsLeft
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : ""}{" "}
                  <span className="totalusers">Units Left</span>
                </div>
              </div>
            </Row>
          </Row>
          <Row className="prevclass">
            <div className="prevclass">
              <Link to="/realtime1" style={{ color: "#444444" }}>
                Next <i className="fa fa-long-arrow-right"></i>
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

export default Statistics1;
