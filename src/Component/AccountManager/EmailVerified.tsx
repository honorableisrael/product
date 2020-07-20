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
import emailverified from "../../assets/emailverified.svg";
import Button from "react-bootstrap/Button";
import GoogleLogo from "../../assets/Google.svg";
import whitepramopro from "../../assets/whitepramopro.svg";

const EmailVerified: React.FunctionComponent = (props: any) => {
  const [state, setFormState] = useState({
    errorMessage: "",
    isloading: false,
  });
  const { errorMessage, isloading } = state;
  const onchange = (e: any) => {
    setFormState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };
  const SubmitForm = (e: any) => {
    const data = {};
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
            <div className="emailverified">
              <img src={emailverified} alt="photoofemailverified" />
            </div>
            <div className="wlcmback2">
              Your email has been successfully verified
            </div>
            <div>
              <Form onSubmit={SubmitForm}>
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
                    {isloading ? "PROCEED" : "PROCEED"}
                  </Button>
                  <div className="checkwrap"></div>
                </Form.Group>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EmailVerified;
