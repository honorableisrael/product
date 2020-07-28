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



const DashboardSubaccounts = () => {
  const [state, setFormState] = React.useState({
    errorMessage: "",
    passwordhide: true,
    show: false,
    isloading: false,
    visible: 6,
  });
  const {
    errorMessage,
    passwordhide,
    show
  } = state;

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
    const handleShow = () =>
    setFormState({
      ...state,
      show: true,
    });
  return (
    <>
      <NavBar />
      <Container fluid={true} className="push">
        <Row className="dashrow">
          <SideBar subaccounts={true} />
          <Col md={10} className="mainbody11">
            <Row className="rowss">
            <MobileSideNav/>
              <Col md={8} className="">
                <div className="sponsorsacc col-md-11">
                  <div>Sub-Accounts</div>
                  <div className="viewsubinfo">
                    View all sub-accounts under your account.
                  </div>
                </div>
                <div className="suss1">
                  <div className="emil1">
                    <img
                      src={useraccount}
                      className="useraccount"
                      alt="useraccount"
                    />
                    <div>
                      <div className="usernameo1">
                        <Link to="/convertsubaccount">Adeshina Adedapo</Link>
                      </div>
                      <div className="em11">meetdapo1@gmail.com</div>
                    </div>
                  </div>
                  <div className="conveta" onClick={handleShow}>Convert</div>
                </div>
                <div className="suss1">
                  <div className="emil1">
                    <img
                      src={useraccount}
                      className="useraccount"
                      alt="useraccount"
                    />
                    <div>
                      <div className="usernameo1">Adeshina Adedapo</div>
                      <div className="em11">meetdapo1@gmail.com</div>
                    </div>
                  </div>
                  <div className="conveta">Convert</div>
                </div>
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
                    <div className="caaa">This action can't be undone</div>
                    <div className="dsdds">
                      <div className="continue1a" onClick={handleClose}>
                        <a  className="continuelk">
                          Back
                        </a>
                      </div>
                      <div className="continueb">
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
