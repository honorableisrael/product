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

const SignUp: React.FunctionComponent = (props: any) => {
  const [state, setFormState] = useState({
    errorMessage: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordhide: true,
    successMessage: "",
    isloading: false,
  });
  const {
    errorMessage,
    password,
    firstname,
    lastname,
    email,
    successMessage,
    passwordhide,
    isloading,
  }: any = state;
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
        console.log(res)
        if (res.data.responseStatus === 400) {
          return setFormState({
            ...state,
            errorMessage: "Failed request please try again later",
          });
        }
        localStorage.setItem(
          "userDetails",
          JSON.stringify({ token: res.data.data })
        );
        props.history.push("/dashboard");
      })
      .catch((err) => {
        setFormState({
          ...state,
          errorMessage: "failed to login",
        });
        console.log(err.response)
      });
  };
  const onchange = (e) => {
    setFormState({
      ...state,
      [e.target.id]: e.target.value,
      errorMessage: "",
    });
  };
  const validateForm = (e) => {
    e.preventDefault();
    if (
      lastname === "" ||
      firstname === "" ||
      email === "" ||
      password === ""
    ) {
      return setFormState({
        ...state,
        errorMessage: "All feilds are required",
      });
    } else {
      SubmitForm();
    }
  };
  const SubmitForm = () => {
    setFormState({
      ...state,
      isloading: true,
    });
    const {
      lastname,
      firstname,
      email,
      password,
      successMessage,
      isloading,
    }: any = state;
    const data = {
      firstname,
      lastname,
      username: email,
      password,
    };
    Axios.post(`${API}/register`, data)
      .then((res) => {
        console.log(res);
        localStorage.setItem("userDetails", JSON.stringify(res.data));
        if (res?.status == 200) {
          setFormState({
            ...state,
            isloading: false,
            errorMessage: "failed to create user please try again",
          });
        }
        if (res?.status == 201) {
          localStorage.setItem(
            "userDetails",
            JSON.stringify({ token: res.data.data })
          );
          checkIfUserIsVerified();
          setFormState({
            ...state,
            isloading: false,
            successMessage: "You have successfully registered",
          });
        }
      })
      .catch((err) => {
        console.log(err.response);
        if (err?.response?.status === 422) {
          return setFormState({
            ...state,
            errorMessage:
              err?.response?.data?.error?.username ||
              err?.response?.data?.error?.password,
          });
        } else if (err.message ? err.message : err) {
          setFormState({
            ...state,
            errorMessage: "Network Error",
            isloading: false,
          });
        } else {
          console.log(err);
          setFormState({
            ...state,
            errorMessage: "Sign Up Failed",
            isloading: false,
          });
        }
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
        localStorage.setItem(
          "userInfo",
          JSON.stringify(res.data.data)
        );
        setInterval(() => {
          return props.history.push("/verify-account");
        }, 1000);
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
            <div className="wlcmback">Welcome to Pramopro,</div>
            <div className="wlcmback1">Create your account</div>
            <div>
              <Form onSubmit={validateForm}>
                <p className="loginerror">{errorMessage}</p>
                <p className="bgs">{successMessage}</p>
                <Form.Group>
                  <h6 className="user12">First Name</h6>
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
                <Form.Group>
                  <h6 className="user12">Last Name</h6>
                  <Form.Control
                    type="text"
                    value={lastname}
                    className="userfield"
                    id="lastname"
                    onChange={onchange}
                    placeholder=""
                  />
                  <i
                    className="fa fa-envelope field-right-icon"
                    aria-hidden="true"
                  ></i>
                </Form.Group>
                <Form.Group>
                  <h6 className="user12">Email</h6>
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
                  <h6 className="user12">Password</h6>
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
                    onClick={validateForm}
                    type="submit"
                    size="lg"
                    variant="secondary"
                    block
                  >
                    {" "}
                    {!isloading ? "CREATE ACCOUNT" : "CREATING ACCOUNT"}
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
                  <div className="checkwrap1">
                    <div>
                      By clicking the "Create Account" button, you are creating
                      a Pramopro account, and you agree to Pramopro's
                      <span className="forgotpass">
                        <Link to="privacypolicy"> Privacy Policy</Link>{" "}
                      </span>
                    </div>
                  </div>
                  <div className="newpram1">
                    <span className="newpram">Already have an account ?</span>{" "}
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

export default SignUp;
