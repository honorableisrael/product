import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Dashboard.css";
import Form from "react-bootstrap/Form";
import { useEffect } from "react";
import Axios from "axios";
import { API } from "../../config";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const NOKDetails = () => {
  const [state, setFormState] = React.useState({
    errorMessage: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    relationship: "",
    isloading: false,
  });
  const {
    errorMessage,
    firstname,
    lastname,
    address,
    phone,
    relationship,
    email,
    isloading,
  } = state;
  useEffect(() => {
    const loggedIn = localStorage.getItem("userDetails");
    const token = loggedIn ? JSON.parse(loggedIn).token : "";
    Axios.get(`${API}/user/next-of-kin`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log(res);
        setFormState({
          ...state,
          firstname: res.data.data.name,
          lastname: res.data.data.name,
          phone: res.data.data.phone,
          email: res.data.data.email,
          relationship: res.data.data.relationship,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const onchange = (e: any) => {
    setFormState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };
  const updateNextOfKinInformation = () => {
    setFormState({
      ...state,
      isloading: true,
    });
    const user: any = localStorage.getItem("userDetails");
    const user_id = JSON.parse(user);
    const id = user_id.user.id;
    var token = user_id.token;
    const data = {
      name: firstname,
      relationship,
      phone,
      email,
    };
    Axios.put(`${API}/user/next-of-kin`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        notify("Next of kin updated successfully");
        setFormState({
          ...state,
          isloading: false,
        });
      })
      .catch((err) => {
        setFormState({
          ...state,
          isloading: false,
          errorMessage: "Failed to update",
        });
      });
  };
  const notify = (message: string, container = "A") => {
    toast(message, { containerId: container });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };
  return (
    <>
      <Row className="refwq1">
        <Col md={12}>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <h6 className="userprofile">Full Name</h6>
                  <Form.Control
                    type="text"
                    value={firstname}
                    className="userfield"
                    id="firstname"
                    onChange={onchange}
                    placeholder=""
                  />
                  <i
                    className="fa fa-envelope field-right-icon"
                    aria-hidden="true"
                  ></i>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <h6 className="userprofile">Relationship</h6>
                  <Form.Control
                    type="text"
                    value={relationship}
                    className="userfield"
                    id="relationship"
                    onChange={onchange}
                    placeholder=""
                  />
                  <i
                    className="fa fa-envelope field-right-icon"
                    aria-hidden="true"
                  ></i>
                </Form.Group>
              </Col>
            </Row>
            <Row></Row>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <h6 className="userprofile">Email</h6>
                  <Form.Control
                    type="email"
                    value={email}
                    className="userfield"
                    id="email"
                    onChange={onchange}
                    placeholder=""
                  />
                  <i
                    className="fa fa-envelope field-right-icon"
                    aria-hidden="true"
                  ></i>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <h6 className="userprofile">Phone Number</h6>
                  <Form.Control
                    type="tel"
                    value={phone}
                    className="userfield"
                    id="phone"
                    onChange={onchange}
                    placeholder=""
                  />
                  <i
                    className="fa fa-envelope field-right-icon"
                    aria-hidden="true"
                  ></i>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group>
                  <h6 className="userprofile">Address </h6>
                  <Form.Control
                    type="text"
                    value={address}
                    className="userfield"
                    id="address"
                    onChange={onchange}
                    placeholder=""
                  />
                  <i
                    className="fa fa-envelope field-right-icon"
                    aria-hidden="true"
                  ></i>
                </Form.Group>
              </Col>
            </Row>
          </Form>
          <Row className="sds">
            <div>
              <div className="updatebtn" onClick={updateNextOfKinInformation}>
                Update
              </div>
            </div>
          </Row>
        </Col>
      </Row>
      <ToastContainer
        enableMultiContainer
        containerId={"B"}
        toastClassName="bg-danger text-white"
        hideProgressBar={true}
        position={toast.POSITION.TOP_CENTER}
      />
      <ToastContainer
        enableMultiContainer
        containerId={"A"}
        toastClassName="bg-success text-white"
        hideProgressBar={true}
        position={toast.POSITION.TOP_CENTER}
      />
    </>
  );
};

export default NOKDetails;
