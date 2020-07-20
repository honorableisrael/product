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
import whitepramopro from "../../assets/whitepramopro.svg";

const ForgotPassword: React.FunctionComponent = (props: any) => {
  const [state, setFormState] = useState({
    errorMessage: "",
    email: "",
    isloading: false,
  });
  const { errorMessage, email, isloading } = state;
  const onchange = (e: any) => {
    setFormState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };
  const SubmitForm = (e: any) => {
    const data = {
      email,
    };
    Axios.post(`${API}/login`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
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
              <Form onSubmit={SubmitForm}>
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
                    onClick={SubmitForm}
                    type="submit"
                    size="lg"
                    variant="secondary"
                    block
                  >
                    {" "}
                    {isloading ? "REQUESTING" : "REQUEST RESET"}
                  </Button>
                  <div className="checkwrap">
                  </div>
                  <div className="newpram1">
                    <span className="newpram">Remember your password?</span>{" "}
                    <span className="signup"><Link to="/signin">Login</Link></span>
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
