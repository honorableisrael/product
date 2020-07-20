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

const SignIn: React.FunctionComponent = (props: any) => {
  const [state, setFormState] = useState({
    errorMessage: "",
    email: "",
    password: "",
    passwordhide: true,
    isloading: false,
  });
  const { errorMessage, password, email, passwordhide, isloading } = state;
  const onchange = (e) => {
    setFormState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };
  const SubmitForm = (e) => {
    const data = {
      email,
      password,
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
            <Link to="/">
              <img src={whitepramopro} className="whitepram" />
            </Link>
          </Col>
          <Col md={5} sm={10} className="signinwrap">
            <div className="wlcmback">Welcome back,</div>
            <div className="wlcmback1">Log into your account</div>
            <div>
              <Form onSubmit={SubmitForm}>
                <p className="loginerror">{errorMessage}</p>
                <Form.Group>
                  <h6 className="user12">Enter Email</h6>
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
                  <h6 className="user12">Enter Password</h6>
                  <Form.Control
                    type={passwordhide ? "password" : "text"}
                    onChange={onchange}
                    value={password}
                    className="userfield"
                    id="password"
                    placeholder=""
                  />
                  <div className="dsplblck">
                    <span
                      onClick={() =>
                        setFormState({
                          ...state,
                          passwordhide: passwordhide ? false : true,
                        })
                      }
                      className="HIDE"
                    >
                      {passwordhide ? "SHOW" : "HIDE"}
                    </span>
                  </div>
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
                    {!isloading ? "LOGIN TO YOUR ACCOUNT" : "LOGGING IN"}
                  </Button>
                  <div className="or">OR</div>
                  <div className="googleAuth">
                    <img
                      src={GoogleLogo}
                      alt="googleLogo"
                      className="googleLogo"
                    />
                    CONTINUE WITH GOOGLE{" "}
                  </div>
                  <div className="checkwrap">
                    <div>
                      <input type="checkbox" className="checuser" /> Keep me
                      logged in
                    </div>
                    <div className="forgotpass">
                      <Link to="/forgotpassword">Forgot Password</Link>
                    </div>
                  </div>
                  <div className="newpram1">
                    <span className="newpram">New to pramopro?</span>{" "}
                    <span className="signup">
                      <Link to="/signup">Sign Up</Link>
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

export default SignIn;
