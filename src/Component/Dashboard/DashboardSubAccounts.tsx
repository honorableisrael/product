import * as React from "react";
import NavBar from "../SubComponents/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useraccount from "../../assets/useraccount.png";
import "./Dashboard.css";
import SideBar from "./sidebar";
import RightSideBar from "./rightSideBar";
import { Link } from "react-router-dom";
import MobileSideNav from "./MobileSideNav";
import Modal from "react-bootstrap/Modal";
import Axios from "axios";
import { API } from "../../config";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import preloader1 from "../../assets/preloader1.gif";
import Spinner from "react-bootstrap/Spinner";
import nosubaccounts from "../../assets/zerosponsor.png";
import RightSideBarCRM from "./rightSideBarCRM";
import RightSideBarInfoArea from "./RightSideBarInfoArea";
import RightSideBarNameAndImage from "./RightSideBarNameandImage";

const DashboardSubaccounts = (props) => {
  const [state, setFormState] = React.useState({
    errorMessage: "",
    subaccounts: [],
    passwordhide: true,
    show: false,
    convertId: "",
    isloading: false,
    visible: 6,
    isloading2: false,
  });
  const {
    errorMessage,
    passwordhide,
    show,
    isloading2,
    convertId,
    subaccounts,
  }: any = state;
  React.useEffect(() => {
    setFormState({
      ...state,
      isloading2: true,
    });
    const loggedIn = localStorage.getItem("userDetails");
    const token = loggedIn ? JSON.parse(loggedIn).token : "";
    Axios.get(`${API}/sub-accounts`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log(res);
        setFormState({
          ...state,
          subaccounts: res.data.data,
          isloading2: false,
        });
      })
      .catch((err) => {
        console.log(err);
        setFormState({
          ...state,
          isloading2: false,
        });
      });
  }, []);
  const onchange = (e) => {
    setFormState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };
  const handleClose = () =>
    setFormState({
      ...state,
      show: false,
    });
  const handleShow = (id) =>
    setFormState({
      ...state,
      show: true,
      convertId: id,
    });
  const notify = (message: string, container = "i") => {
    toast(message, { containerId: container });
    setTimeout(() => {
      setFormState({
        ...state,
        show: false,
      });
    }, 4000);
  };
  const convertToStandAlone = () => {
    console.log(convertId);
    const loggedIn = localStorage.getItem("userDetails");
    const userdata = loggedIn ? JSON.parse(loggedIn) : "";
    const token = loggedIn ? JSON.parse(loggedIn).token : "";
    Axios.post(
      `${API}/sub-accounts/${convertId}/convert`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setFormState({
            ...state,
            isloading: false,
          });
          setTimeout(() => {
            props.history.push("/subaccountsuccess");
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err.response);
        if (err?.response?.status === 400) {
          setFormState({
            ...state,
            isloading: false,
            errorMessage:
              err?.response?.data?.message ||
              err?.response?.data?.message ||
              err?.response?.data?.statusText,
          });
          return notify(err?.response?.data?.message);
        }

        return setFormState({
          ...state,
          isloading: false,
          errorMessage: "Failed to convert",
        });
      });
  };
  console.log(subaccounts);
  return (
    <>
      <NavBar />
      <Container fluid={true} className="push">
        <Row className="dashrow">
          <SideBar subaccounts={true} />
          <Col md={10} className="mainbody11">
            <Row className="rowss">
              <MobileSideNav />
              <Col md={7} className="">
                <div className="sponsorsacc col-md-11">
                  <div>Sub-Accounts</div>
                  <div className="viewsubinfo">
                    View all sub-accounts under your account.
                  </div>
                </div>
                {isloading2 && (
                  <div className="preloadercent">
                    <Spinner variant={"success"} animation={"grow"}></Spinner>
                  </div>
                )}
                <div className="mobileitle ddw2">
                  <RightSideBarNameAndImage />
                </div>
                {subaccounts.length == 0 && !isloading2 && (
                  <div className="nosubaccounts1">
                    <img
                      src={nosubaccounts}
                      className="nosubaccounts"
                      alt="nosubaccounts"
                    />
                    <div className="text-center">
                      You currently have no sub account
                    </div>
                  </div>
                )}
                {subaccounts?.map((data, i) => (
                  <div className="suss1" key={i}>
                    <div className="emil1">
                      <img
                        src={useraccount}
                        className="useraccount"
                        alt="useraccount"
                      />
                      <div>
                        <div className="usernameo1">
                          <Link to={`/subaccount/${data.id}`}>
                            {data.first_name} {data.last_name}
                          </Link>
                        </div>
                        <div className="em11">{data.email}</div>
                      </div>
                    </div>
                    <div
                      className="conveta"
                      onClick={() => handleShow(data.id)}
                    >
                      Convert
                    </div>
                  </div>
                ))}
              </Col>
              <Modal show={show} centered={true} onHide={handleClose}>
                <div className="ssds1w">
                  <Modal.Header closeButton>
                    <Modal.Title className="mks1">
                      {" "}
                      <div>
                        <span className="mks2">CONFIRM CONVERT</span>{" "}
                      </div>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="congg">
                      Are you sure you want to make this account a standalone
                      account?
                    </div>
                    <p>{errorMessage}</p>
                    <div className="caaa">This action can't be undone</div>
                    <div className="dsdds">
                      <div className="continue1a" onClick={handleClose}>
                        <a className="continuelk">Back</a>
                      </div>
                      <div className="continueb" onClick={convertToStandAlone}>
                        Continue
                      </div>
                    </div>
                  </Modal.Body>
                  <ToastContainer
                    enableMultiContainer
                    containerId={"i"}
                    toastClassName="bg-danger text-white"
                    hideProgressBar={true}
                    position={toast.POSITION.TOP_CENTER}
                  />
                </div>
              </Modal>
              <div className="tmobileonly">
                <RightSideBarCRM />
              </div>
              <RightSideBar />
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default DashboardSubaccounts;
