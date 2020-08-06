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

const DashboardSubaccounts = (props) => {
  const [state, setFormState] = React.useState({
    errorMessage: "",
    subaccounts: [],
    passwordhide: true,
    show: false,
    convertId: "",
    isloading: false,
    visible: 6,
  });
  const {
    errorMessage,
    passwordhide,
    show,
    convertId,
    subaccounts,
  }: any = state;
  React.useEffect(() => {
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
        });
      })
      .catch((err) => {
        console.log(err);
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
        if (err?.status === 400) {
          return setFormState({
            ...state,
            isloading: false,
            errorMessage:
              err?.data?.message || err?.data?.message || err?.data?.statusText,
          });
        }
        return setFormState({
          ...state,
          isloading: false,
          errorMessage:"Failed to convert"
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
              <Col md={8} className="">
                <div className="sponsorsacc col-md-11">
                  <div>Sub-Accounts</div>
                  <div className="viewsubinfo">
                    View all sub-accounts under your account.
                  </div>
                </div>
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
                </div>
              </Modal>
              <RightSideBar />
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default DashboardSubaccounts;
