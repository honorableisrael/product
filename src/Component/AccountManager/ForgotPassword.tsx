import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./SignIn.css";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Axios from "axios";
import { API } from "../../config";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import GoogleLogo from "../../assets/Google.svg";
import Alert from "react-bootstrap/Alert";  
import whitepramopro from "../../assets/whitepramopro.svg";

const ForgotPassword: React.FunctionComponent = (props: any) => {
  const [state, setFormState] = useState({
    errorMessage: "",
    email: "",
    isloading: false,
    success: false,
    error: false,
    successMessage: "",
  });
  const { errorMessage, email, isloading, successMessage } = state;
  const onchange = (e: any) => {
    setFormState({
      ...state,
      [e.target.id]: e.target.value,
      errorMessage: "",
    });
  };
  const ForgotPass = (e) => {
    e.preventDefault();
    if (email === "") {
      return setFormState({
        ...state,
        errorMessage: "Please enter your email",
      });
    }
    setFormState({
      ...state,
      isloading: true,
    });
    e.preventDefault();
    const data = {
      email,
    };
    Axios.post(`${API}/password/email`, data)
      .then(res => {
        console.log(res);
        if (res?.status === 200) {
          return setFormState({
            ...state,
            successMessage: res.data.message,
            isloading: false,
          });
        }
        setFormState({
          ...state,
          isloading: false,
        });
      })
      .catch((err) => {
        if (err.status == 422) {
          return setFormState({
            ...state,
            errorMessage: err?.statusText,
            isloading: false,
          });
        }
        if (err.status == 400) {
          return setFormState({
            ...state,
            errorMessage: err.data.message,
            isloading: false,
          });
        }
        setFormState({
          ...state,
          isloading: false,
          errorMessage:
            err.response && err.response.data && err.response.data.message
              ? err.response.data.message
              : "Network Error",
        });
      });
  };
  return (
    <>
      <Container fluid={true} className="signincontainer">
        <Row className="signrow">
          <Col md={12} className="diax">
            {" "}
            <img src={whitepramopro} className="whitepram" />
          </Col>
          <Col md={5} sm={10} className="signinwrap">
            <div className="wlcmback">Hello</div>
            <div className="wlcmback1">Request password request</div>
            <div>
              {successMessage ? (
                <Alert variant="info" className="change-alert">
                  We have sent a password reset link via the provided email
                  address. The link would expire in 30 minutes
                </Alert>
              ) : (
                ""
              )}
              <Form onSubmit={ForgotPass}>
                <p className="loginerror">{errorMessage}</p>
                <Form.Group>
                  <h6 className="user12">Enter Email Address</h6>
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
                <Form.Group>
                  <Button
                    className="sub-btn"
                    onClick={ForgotPass}
                    type="submit"
                    size="lg"
                    variant="secondary"
                    block
                  >
                    {" "}
                    {isloading ? "REQUESTING" : "REQUEST RESET"}
                  </Button>
                  <div className="checkwrap"></div>
                  <div className="newpram1">
                    <span className="newpram">Remember your password?</span>{" "}
                    <span className="signup">
                      <Link to="/signin">Login</Link>
                    </span>
                  </div>
                </Form.Group>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ForgotPassword;
