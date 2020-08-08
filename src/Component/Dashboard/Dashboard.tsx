import * as React from "react";
import NavBar from "../SubComponents/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import dashcenter from "../../assets/dashcenter.svg";
import daterange1 from "../../assets/dategreen.svg";
import avatar from "../../assets/avatar.png";
import money1 from "../../assets/money1.png";
import moneyorange from "../../assets/moneyorange.png";
import dateorange from "../../assets/dateorange.png";
import crmillustration from "../../assets/crmillustration.png";
import "./Dashboard.css";
import SideBar from "./sidebar";
import RightSideBar from "./rightSideBar";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Axios from "axios";
import { API } from "../../config";
import MobileSideNav from "./MobileSideNav";
import standingman from "../../assets/standingman.svg";
import prodcash from "../../assets/prodcash.png";

const Dashboard = (props: any) => {
  const [state, setNewState] = React.useState({
    focus: true,
    focus1: false,
    user: "",
    token: "",
    products: "",
    modalShow: false,
    hasprofileimage: false,
    redirect: false,
    endOfCycle: "",
    expectedReturn: "",
    show: false,
    success: "",
    errorMessage: "",
    socialImage: "",
    message: "",
    isverified: false,
    subject: "",
    iscomplete: true,
    isloading: false,
    collectedReturn: "",
  });
  const {
    user,
    products,
    endOfCycle,
    isverified,
    isloading,
    expectedReturn,
    collectedReturn,
  }: any = state;
  useEffect(() => {
    setNewState({
      ...state,
      isloading: true,
    });
    const loggedIn = localStorage.getItem("userDetails");
    const userID:any  = localStorage.getItem("userInfo")
    const passedID = JSON.parse(userID);
    const userdata = loggedIn
      ? JSON.parse(loggedIn)
      : props?.history?.push("/signin");
    const token = loggedIn ? JSON.parse(loggedIn).token : "";
    //check location and redirect to realtime
    const changeLocation = localStorage.getItem("ChangeLocation");
    const newLocation = changeLocation ? JSON.parse(changeLocation) : "";
    console.log(newLocation);
    if (newLocation) {
      sessionStorage.removeItem("ChangeLocation");
      props.history.push("/realtime");
    }
    const userId = passedID.id;
    Axios.get(`${API}/user/trade-summary`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log(res);
        setNewState({
          ...state,
          user: res.data.data[0],
          isloading: false,
        });
      })
      .catch((err) => {
        setNewState({
          ...state,
          errorMessage: "Failed to load try again later",
          isloading: false,
        });
      });
  }, []);
  const FormatAmount = (amount) => {
    return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <>
      <NavBar />
      <Container fluid={true} className="push">
        <Row className="dashrow">
          <SideBar dashboard={true} />
          <Col md={10} className="mainbody11">
            <Row className="rowss">
              <MobileSideNav />
              <Col
                md={8}
                className={
                  user.numberPurchased > 0 ? "prodcu" : "modea revcol1"
                }
              >
                {user?.numberPurchased == 0 && (
                  <div className="midcontent">
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
                    <div className="exploreprod">
                      <Link to="/products">EXPLORE PRODUCTS</Link>
                    </div>
                  </div>
                )}
                {user?.numberPurchased !== 0 && !isloading && (
                  <>
                    <div className="wr111">
                      <div className="productcash">
                        <img
                          src={standingman}
                          className="mancashimg"
                          alt="productcash"
                        />
                      </div>
                      <div>
                        <div className="productsdash">Products</div>
                        <div className="productsdash1">Total Subscribed</div>
                      </div>
                      <div className="productsdash2">
                        {user?.numberPurchased}
                      </div>
                    </div>
                    <div className="wr111">
                      <img
                        src={prodcash}
                        className="productcash"
                        alt="productcash"
                      />
                      <div>
                        <div className="productsdash">Sales</div>
                        <div className="productsdash1">Total Sales</div>
                      </div>
                      <div className="productsdash2">
                        ₦{FormatAmount(user?.totalSales)}
                      </div>
                    </div>
                  </>
                )}
              </Col>
              <RightSideBar
                endOfCycle={endOfCycle}
                expectedReturn={expectedReturn}
                collectedReturn={collectedReturn}
              />
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Dashboard;
