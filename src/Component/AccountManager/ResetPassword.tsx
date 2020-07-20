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

const EnterNewPassword: React.FunctionComponent = (props: any) => {
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
              <Form onSubmit={SubmitForm}>
                <p className="loginerror">{errorMessage}</p>
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
                    onClick={SubmitForm}
                    type="submit"
                    size="lg"
                    variant="secondary"
                    block
                  >
                    {" "}
                    {!isloading ? "CHANGE PASSWORD" : "Loading"}
                  </Button>
                  <div className="checkwrap2">
                    <div>Remember
                      your password? <span className="forgotpass">Login</span>
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
