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
import { BrowserView, MobileView } from "react-device-detect";
import RightSideBarInfoArea from "./RightSideBarInfoArea";
import RightSideBarCRM from "./rightSideBarCRM";
import { Button } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import statement from "../../assets/statement.svg";


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
    isLoading:false,
    collectedReturn: "",
  });
  const {
    user,
    products,
    endOfCycle,
    isverified,
    isLoading,
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
    const userID: any = localStorage.getItem("userInfo");
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
    const userId = passedID?.id;
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
  const downloadRecpt = () => {
    setNewState({
      ...state,
      isLoading:true
    })
    const loggedIn = localStorage.getItem("userDetails");
    const userdata = loggedIn
      ? JSON.parse(loggedIn)
      : props?.history?.push("/signin");
    const token = loggedIn ? JSON.parse(loggedIn).token : "";
    Axios.get(`${API}/account-statement`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        console.log(res.data)
        notify("Your statement of account has been sent to your email")
        setNewState({
          ...state,
          isLoading:false
        })
      })
      .catch((err)=>{
        console.log(err)
        setNewState({
          ...state,
          isLoading:false
        })
        notify("Failed to send please try again later")
      })
  }
  const notify = (message: string, container = "i") => {
    toast(message, { containerId: container });
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
              <div className="mobileitle">
                <RightSideBarInfoArea />
              </div>
              <Col
                md={7}
                className={
                  user.numberPurchased > 0 ? "prodcu" : "modea modea11 revcol1"
                }
                xs={12}
                sm={12}
              >
                {user?.numberPurchased == 0 && (
                  <div className="midcontent marfa">
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
                {user?.numberPurchased !== 0 && !isloading && (
                  <>
                    <div className="wr111 grren">
                      <div className="productcash">
                        <img
                          src={statement}
                          className="mancashimgds"
                          alt="productcash"
                        />
                      </div>
                      <div>
                        <div className="productsdash">Statement of </div>
                        <div className="productsdash1"><b>Account</b></div>
                      </div>
                      <div className="productsdash2">
                        <Button className="downloadrcp btn-success" onClick={downloadRecpt}>{!isLoading?"Download":"Downloading"}</Button>
                      </div>
                    </div>
                  </>
                )}
              </Col>
              <div className="tmobileonly">
                <RightSideBarCRM />
              </div>
              <div className="mobilelargeonly">
                <RightSideBar
                  endOfCycle={endOfCycle}
                  expectedReturn={expectedReturn}
                  collectedReturn={collectedReturn}
                />
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
      <ToastContainer
        enableMultiContainer
        containerId={"i"}
        toastClassName="bg-info text-white"
        hideProgressBar={true}
        position={toast.POSITION.TOP_CENTER}
      />
    </>
  );
};
export default Dashboard;
