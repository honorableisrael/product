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

const SignUp: React.FunctionComponent = (props: any) => {
  const [state, setFormState] = useState({
    errorMessage: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordhide: true,
    isloading: false,
  });
  const {
    errorMessage,
    password,
    firstname,
    lastname,
    email,
    passwordhide,
    isloading,
  } = state;
  //  const responseGoogle = (response) => {
  //     console.log(response);
  //         console.log(response.profileObj);
  //         const data = {
  //             name : response.profileObj.name,
  //             email : response.profileObj.email,
  //             user_id : response.googleId,
  //             imageUrl:response.profileObj.imageUrl,
  //             provider : "Google"
  //         }
  //         // console.log(data)
  //         Axios.post(`${API}/api/v1/login/social`,data)
  //         .then(res=>{
  //           console.log(res)
  //         })
  //         .catch(err=>{
  //             this.setState({
  //                 errorMessage:"failed to login"
  //             })
  //         })
  //     }
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
            <img src={whitepramopro} className="whitepram" />
          </Col>
          <Col md={5} sm={10} className="signinwrap">
            <div className="wlcmback">Welcome to Pramopro,</div>
            <div className="wlcmback1">Create your account</div>
            <div>
              <Form onSubmit={SubmitForm}>
                <p className="loginerror">{errorMessage}</p>
                <Form.Group>
                  <h6 className="user12">FirstName</h6>
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
                  <h6 className="user12">LastName</h6>
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
                    onClick={SubmitForm}
                    type="submit"
                    size="lg"
                    variant="secondary"
                    block
                  >
                    {" "}
                    {!isloading ? "CREATE ACCOUNT" : "CREATING ACCOUNT"}
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
                  <div className="checkwrap1">
                    <div>
                      By clicking the "Create Account" button, you are creating
                      a Pramopro account, and you agree to Pramopro's 
                      <span className="forgotpass"> Privacy Policy </span>
                    </div>
                  </div>
                  <div className="newpram1">
                    <span className="newpram">Already have an account ?</span>{" "}
                    <span className="signup">Login</span>
                  </div>
                  {/* <p className="text-forgot-password">
                    <Link
                      className="text-forgot-password"
                      to="password-recovery"
                    >
                      Forgot Password?
                    </Link>
                  </p> */}
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
