import * as React from "react";
import NavBar from "../SubComponents/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import "./Dashboard.css";
import SideBar from "./sidebar";
import PersonalDetails from "./PersonalDetails";
import editprofilephoto from "../../assets/editprofilephoto.png";
import ContactDetails from "./ContactDetails";
import NOKDetails from "./NOKDetails";
import BankDetails from "./BankDetails";
import Password from "./Password";
import { useState, useEffect } from "react";
import Axios from "axios";
import { API } from "../../config";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import MobileSideNav from "./MobileSideNav";

const ProfileSettings = (props) => {
  const [state, setFormState] = useState({
    selectedFile: "",
    errorMessage: "",
    isloading: false,
    user: "",
    success: "",
    show: false,
  });
  const {
    selectedFile,
    errorMessage,
    isloading,
    success,
    user,
    show,
  }: any = state;
  const onChangeHandler = (event) => {
    setFormState({
      ...state,
      selectedFile: event.target.files[0],
      errorMessage: "",
    });
  };
  const setShow = () => {
    setFormState({
      ...state,
      show: true,
    });
  };
  const imageUpload = () => {
    setFormState({
      ...state,
      isloading: true,
    });
    const loggedIn: any = localStorage.getItem("userDetails");
    const userinfo: any = JSON.parse(loggedIn);
    console.log(userinfo);
    const token = loggedIn ? JSON.parse(loggedIn).token : "";
    const data = new FormData();
    data.append("image", selectedFile);
    Axios.post(`${API}/api/v1/user/${userinfo.user.id}/profile-picture`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log(res);
        if (res.data.responseStatus === 200) {
          setFormState({
            ...state,
            isloading: false,
            success: "",
          });
          window.location.reload();
        }
      })
      .catch((err) => {
        setFormState({
          ...state,
          isloading: false,
          errorMessage: err.response
            ? err.response.data.msg
            : "No Internet Connection",
        });
      });
  };
  const handleClose = () => {
    setFormState({
      ...state,
      show: false,
    });
  };
  useEffect(() => {
    const loggedIn = localStorage.getItem("userDetails");
    const userdata = loggedIn ? JSON.parse(loggedIn) : "";
    const token = loggedIn ? JSON.parse(loggedIn).token : "";
    Axios.get(`${API}/api/v1/user`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log(res);
        if (res?.data?.responseStatus === 401) {
          props.history.push("/signin");
        }
        if (res.data.user.verified === false) {
          return props.history.push("/verify-account");
        }
        if (res?.data?.user?.verified === true) {
          setFormState({
            ...state,
            user: res.data.user,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <NavBar />
      <Container fluid={true} className="push">
        <Row className="dashrow">
          <SideBar settings={true} />
          <Col md={10} className="mainbody11">
            <Row className="rowss">
            <MobileSideNav/>
              <Col md={12}>
                <div className="settings col-md-11">
                  <div>Settings</div>
                  <div className="seet">
                    <img
                      src={
                        user && user.profileImage
                          ? user.profileImage
                          : editprofilephoto
                      }
                      className="editprofilephoto"
                      alt="editprofilephoto"
                      onClick={setShow}
                    />
                    <div className="change11" onClick={setShow}>Change Picture</div>
                  </div>
                </div>
                <Col md={{ span: 11 }} className="userfirstitems-tabs ">
                  <Tabs
                    defaultActiveKey="PersonalDetails"
                    id="uncontrolled-tab-example"
                  >
                    <Tab eventKey="PersonalDetails" title="Personal Details">
                      <PersonalDetails />
                    </Tab>
                    <Tab eventKey="ContactDetails" title="Contact Details">
                      <ContactDetails />
                    </Tab>
                    <Tab eventKey="nxtofkin" title="Next-Of-Kin Details">
                      <NOKDetails />
                    </Tab>
                    <Tab eventKey="bankdetails" title="Bank Details">
                      <BankDetails />
                    </Tab>
                    <Tab eventKey="ResetPassword" title="Password">
                      <Password />
                    </Tab>
                  </Tabs>
                </Col>
              </Col>
            </Row>
          </Col>
        </Row>
        {/* Change Picture Modal */}
        <Modal
          {...props}
          size="md"
          show={show}
          onHide={handleClose}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header className="modalheaderprofilephoto" closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <i className="fa fa-cloud-upload" aria-hidden="true"></i> Upload
              Profile Photo
            </Modal.Title>
          </Modal.Header>
          <p className="text-success messagetocrm"> {success}</p>
          <p className="text-danger messagetocrm"> {errorMessage}</p>
          <Modal.Body>
            <p style={{ textAlign: "center" }} className="submit-photo">
              <input
                type="file"
                className="input-file"
                name="file"
                onChange={onChangeHandler}
              />{" "}
              <Button
                onClick={imageUpload}
                className="uploadphotobtn"
                variant="success"
              >
                {isloading ? "Updating..." : "Submit"}
              </Button>
            </p>
          </Modal.Body>
        </Modal>
        {/* Change picture modal ends here */}
      </Container>
    </>
  );
};
export default ProfileSettings;
