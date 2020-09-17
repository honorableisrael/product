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
import GoogleLogin from "react-google-login";

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
      errorMessage: "",
    });
  };
  const validateForm = (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      return setFormState({
        ...state,
        errorMessage: "All fields are required",
      });
    }
    if (email !== "" || password !== "") {
      SubmitForm();
    }
  };
  const SubmitForm = () => {
    const data = {
      username: email,
      password,
    };
    setFormState({
      ...state,
      isloading: true,
    });
    Axios.post(`${API}/login`, data)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          localStorage.setItem(
            "userDetails",
            JSON.stringify({ token: res.data.data })
          );
          checkIfUserIsVerified();
          setFormState({
            ...state,
            isloading: false,
          });
        }
        if (res.data.responseStatus == 400) {
          setFormState({
            ...state,
            isloading: false,
            errorMessage: res.data.responseMessage,
          });
        }
        if (res.data.responseStatus == 401) {
          setFormState({
            ...state,
            isloading: false,
            errorMessage: "Unauthorized",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        return setFormState({
          ...state,
          errorMessage:
            err.response && err.response.data && err.response.data.message
              ? err.response.data.message ||
                err?.response?.data?.responseMessage
              : "connection error",
          isloading: false,
        });
      });
  };
  const checkIfUserIsVerified = () => {
    const loggedIn = localStorage.getItem("userDetails");
    const userdata = loggedIn ? JSON.parse(loggedIn) : "";
    const token = loggedIn ? JSON.parse(loggedIn) : "";
    Axios.get(`${API}/user`, {
      headers: { Authorization: `Bearer ${token.token}` },
    })
      .then((res) => {
        console.log(res);
        localStorage.setItem(
          "userEmail",
          JSON.stringify(res.data.data.username)
        );
        localStorage.setItem("userInfo", JSON.stringify(res.data.data));
        if (res?.data?.data?.verified === false) {
          return props.history.push("/verify-account");
        }
        if (res?.data?.data?.verified === true) {
          props.history.push("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
    const data = {
      name: response.profileObj.name,
      email: response.profileObj.email,
      user_id: response.googleId,
      provider: "Google",
    };
    // console.log(data)
    Axios.post(`${API}/login/social`, data)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          localStorage.setItem(
            "userDetails",
            JSON.stringify({ token: res.data.data })
          );
          checkIfUserIsVerified();
          return setFormState({
            ...state,
            isloading: false,
          });
        }
      })
      .catch((err) => {
        setFormState({
          ...state,
          errorMessage: "failed to login",
        });
        console.log(err.response);
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
              <Form onSubmit={validateForm}>
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
                  <GoogleLogin
                    clientId="483910264468-arsekcf8p98ftamg4qjqvcev9n985d5n.apps.googleusercontent.com"
                    render={(renderProps) => (
                      <div className="googleAuth" onClick={renderProps.onClick}>
                        <img
                          src={GoogleLogo}
                          alt="googleLogo"
                          className="googleLogo"
                        />
                        CONTINUE WITH GOOGLE{" "}
                      </div>
                    )}
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                  />
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
