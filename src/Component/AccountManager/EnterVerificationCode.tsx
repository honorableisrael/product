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

const EnterVerificationCode: React.FunctionComponent = (props: any) => {
  const inputEl1: any = React.useRef("");
  const inputEl2: any = React.useRef("");
  const inputEl3: any = React.useRef("");
  const inputEl4: any = React.useRef("");
  const inputEl5: any = React.useRef("");
  const inputEl6: any = React.useRef("");
  const [state, setFormState] = useState({
    errorMessage: "",
    code: "",
    isloading: false,
  });
  //Logic for handling six digit code with refs
  const onChangeHandler = (e) => {
    const inputVal1 = inputEl1.current.value; //stored the value of the each input in the variables inputVal1-inputVal6
    const inputVal2 = inputEl2.current.value;
    const inputVal3 = inputEl3.current.value;
    const inputVal4 = inputEl4.current.value;
    const inputVal5 = inputEl5.current.value;
    const inputVal6 = inputEl6.current.value;
    if (inputVal1 !== 0 && !inputVal2) {
      //if
      inputEl2.current.focus();
    }
    if (inputVal2 && !inputVal3) {
      inputEl3.current.focus();
    }
    if (inputVal3 && !inputVal4) {
      inputEl4.current.focus();
    }
    if (inputVal4 && !inputVal5) {
      inputEl5.current.focus();
    }
    if (inputVal5 && !inputVal6) {
      inputEl6.current.focus();
    }
    if (inputVal6) {
    }
    if (e.target.value.length >= 6) {
      inputEl2.current.focus(); //submit form
    }
    setFormState({
      ...state,
      code:
        inputEl1.current.value +
        inputEl2.current.value +
        inputEl3.current.value +
        inputEl4.current.value +
        inputEl5.current.value +
        inputEl6.current.value,
    });
  };
  const { errorMessage, code, isloading } = state;
  const onchange = (e: any) => {
    setFormState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };
  const SubmitForm = (e: any) => {
    e.preventDefault();
    const data = {};
    Axios.post(`${API}/login`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(code);
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
            <div className="wlcmback3">
              Just one more step, Lets verify your email address
            </div>
            <div className="wlcmback4">
              We already sent a code to yourmail@email.com, please check the
              inbox or spam mailbox and insert the 6 digit code in the form
              below to verify your email
            </div>
            <div className="codewrapper">
              <input
                type="text"
                maxLength={1}
                placeholder=""
                onChange={onChangeHandler}
                ref={inputEl1}
                className="sixdigits form-control"
              />
              <input
                type="text"
                maxLength={1}
                onChange={onChangeHandler}
                ref={inputEl2}
                className="sixdigits two form-control"
              />
              <input
                type="text"
                maxLength={1}
                ref={inputEl3}
                onChange={onChangeHandler}
                className="sixdigits form-control"
              />
              <input
                type="text"
                maxLength={1}
                ref={inputEl4}
                onChange={onChangeHandler}
                className="sixdigits form-control"
              />
              <input
                type="text"
                maxLength={1}
                ref={inputEl5}
                onChange={onChangeHandler}
                className="sixdigits form-control"
              />
              <input
                type="text"
                maxLength={1}
                ref={inputEl6}
                onChange={onChangeHandler}
                className="sixdigits form-control"
              />
            </div>
            <div>
              <Form onSubmit={SubmitForm}>
                <Form.Group>
                  <Button
                    className="sub-btn"
                    // onClick={onButtonClick}
                    type="submit"
                    size="lg"
                    variant="secondary"
                    block
                  >
                    {" "}
                    {isloading ? "CONTINUE" : "CONTINUE"}
                  </Button>
                  <div className="checkwrap23">
                    Didn’t get the code? <span className="resend">Resend</span>
                  </div>
                  <div className="dontworry">
                    Don’t worry its only a one time passcode, once your email is
                    verified you won’t need it anymore
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

export default EnterVerificationCode;
