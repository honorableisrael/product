import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./SignIn.css";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import Axios from "axios";
import { API } from "../../config";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import GoogleLogo from "../../assets/Google.svg";
import whitepramopro from "../../assets/whitepramopro.svg";

const EnterNewPassword: React.FunctionComponent = (props: any) => {
  const [state, setFormState]: any = useState({
    errorMessage: "",
    email: "",
    password: "",
    passwordhide: true,
    successMessage: "",
    isloading: false,
    token: "",
  });
  const {
    errorMessage,
    password,
    email,
    passwordhide,
    token,
    successMessage,
    isloading,
  }: any = state;
  const onchange = (e) => {
    setFormState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };
  React.useEffect(() => {
    const query = new URLSearchParams(props.location.search);
    const Token = query.get("token");
    setFormState({
      ...state,
      token: Token,
    });
  }, []);
  const submitForm = (e) => {
    setFormState({ isloading: true });
    e.preventDefault();
    const data = {
      token,
      email,
      password_confirmation: password,
      password,
    };
    Axios.post(`${API}/password/reset`, data)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setFormState({
            ...state,
            isloading: false,
            successMessage: res.data.message,
          });
          setTimeout(() => {
            props.history.push("/signin");
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err.response);
        if (err?.status === 400) {
          return setFormState({
            ...state,
            isloading: false,
            error: true,
            show: true,
            errorMessage:
              err?.data?.message || err?.data?.message || err?.data?.statusText,
          });
        }
        setFormState({
          ...state,
          isloading: false,
          errorMessage:
            err && err.response && err.response.data.message
              ? err.response.data.message
              : "Reset Failed",
          errorMessagePassword:
            err && err.response && err.response.data.errors.password
              ? err.response.data.errors.password
              : "",
        });
      });
  };
  return (
    <>
      <Container fluid={true} className="signincontainer">
        <Row className="signrow">
          <Col md={12} className="diax">
            {" "}
            <Link to="/">
              <img src={whitepramopro} className="whitepram" />
            </Link>
          </Col>
          <Col md={5} sm={10} className="signinwrap">
            <div className="wlcmback">Hello</div>
            <div className="wlcmback1">
              Please enter your new password to continue
            </div>
            <div>
              <Form onSubmit={submitForm}>
                <p className="loginerror">{errorMessage}</p>
                <p className="loginsuccess">{successMessage}</p>
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
                  <h6 className="user12">New Password</h6>
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
                    onClick={submitForm}
                    type="submit"
                    size="lg"
                    variant="secondary"
                    block
                  >
                    {" "}
                    {!isloading ? "CHANGE PASSWORD" : "Loading"}
                  </Button>
                  <div className="checkwrap2">
                    <div>
                      Remember your password?{" "}
                      <span className="forgotpass">
                        <Link to="/signin">Login</Link>
                      </span>
                    </div>
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

export default EnterNewPassword;
