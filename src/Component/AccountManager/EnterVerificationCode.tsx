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
    email: "",
    code: "",
    isloading: false,
    isResending: false,
    successMessage: "",
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
      return sendVerificationCode(e);
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
  const { errorMessage, email, code, isloading, successMessage } = state;
  const onchange = (e: any) => {
    setFormState({
      ...state,
      [e.target.id]: e.target.value,
      errorMessage: "",
      successMessage: "",
    });
  };
  React.useEffect(() => {
    const parseNew: any = localStorage.getItem("userEmail");
    const email = JSON.parse(parseNew);
    setFormState({
      ...state,
      email: email,
    });
    console.log(email);
  }, []);
  const sendVerificationCode = (e) => {
    e.preventDefault();
    setFormState({
      ...state,
      isloading: true,
    });
    const data = {
      verificationCode: code,
    };
    const user: any = localStorage.getItem("userDetails");
    const user_id = JSON.parse(user);
    var token = user_id.token;
    Axios.post(`${API}/api/v1/user/email/verify`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        // console.log(res)
        if (res.data.responseStatus === 200) {
          setFormState({
            ...state,
            isloading: false,
            errorMessage: res.data.responseMessage,
          });
          props.history.push("/dashboard");
        }
        if (res.data.responseStatus === 400) {
          // console.log(res.data)
          setFormState({
            ...state,
            isloading: false,
            errorMessage: res.data.responseMessage,
          });
        }

        if (res.data.responseStatus == 401) {
          // console.log(res.data)
          setFormState({
            ...state,
            isloading: false,
            errorMessage: "Incorrect Verification Code",
          });
        }
      })
      .catch((error) => {
        setFormState({
          ...state,
          isloading: false,
          errorMessage: "connection error",
        });
      });
  };
  const resendCode = () => {
    setFormState({
      ...state,
      errorMessage:"",
      isResending: true,
    });
    const user: any = localStorage.getItem("userDetails");
    const user_id = JSON.parse(user);
    var token = user_id.token;
    const data = {
      email,
    };
    Axios.post(`${API}/api/v1/email/resend`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log(res);
        if (res.data.responseStatus) {
          setFormState({
            ...state,
            errorMessage:"",
            successMessage: res?.data?.responseMessage,
            isResending: false,
          });
          setTimeout(()=>{
            window.location.reload()
          },2000)
        }
      })
      .catch((err) => {
        console.log(err.response);
        setFormState({
          ...state,
          errorMessage: "Resend Failed",
          isResending: false,
        });
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
              We already sent a code to {email}, please check the inbox or spam
              mailbox and insert the 6 digit code in the form below to verify
              your email
            </div>
            <div>
              {" "}
              <p className="loginerror">{errorMessage}</p>
              <p className="loginsuccess">{successMessage}</p>
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
              <Form onSubmit={sendVerificationCode}>
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
                    {!isloading ? "CONTINUE" : "verifying"}
                  </Button>
                  <div className="checkwrap23">
                    Didn’t get the code?{" "}
                    <span className="resend" onClick={resendCode}>
                      Resend
                    </span>
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
