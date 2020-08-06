import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Dashboard.css";
import Form from "react-bootstrap/Form";
import Axios from "axios";
import { API } from "../../config";
import Alert from "react-bootstrap/Alert";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Password = () => {
  const [state, setFormState] = React.useState({
    errorMessage: "",
    confirmPassword: "",
    password: "",
    isloading: false,
  });
  const { errorMessage, password, confirmPassword, isloading } = state;
  const onchange = (e: any) => {
    setFormState({
      ...state,
      [e.target.id]: e.target.value,
      errorMessage: "",
    });
  };
  const validate = () => {
    if (password.trim() === "" && confirmPassword.trim() === "") {
      return setFormState({
        ...state,
        errorMessage: "please fill the empty feild(s)",
      });
    }
    if (confirmPassword !== password) {
      return setFormState({
        ...state,
        errorMessage: "password must be the same",
      });
    }
    if (
      confirmPassword.trim() === password.trim() &&
      confirmPassword.trim() !== "" &&
      password.trim() !== ""
    ) {
      updatePassword();
    }
  };

  const updatePassword = () => {
    setFormState({
      ...state,
      isloading: true,
    });
    const user: any = localStorage.getItem("userDetails");
    const user_id = JSON.parse(user);
    const id = user_id.user.id;
    var token = user_id.token;

    const data = {
      password,
      confirmPassword,
    };
    Axios.post(`${API}/user/password/update`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log(res);
        setFormState({
          ...state,
          isloading: false,
        });
        notify("Update Successfull");
      })
      .catch((err) => {
        setFormState({
          ...state,
          isloading: false,
          errorMessage: "Failed to Update",
        });
      });
  };
  const notify = (message: string, container = "A") => {
    toast(message, { containerId: container });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <>
      <Row className="refwq1">
        <Col md={12}>
          <Form onSubmit={validate}>
            {errorMessage && (
              <div className="eee11">
                <Alert variant={"danger"} className="texterror err11">
                  {errorMessage}
                </Alert>
              </div>
            )}
            <Row>
              <Col md={6}>
                <Form.Group>
                  <h6 className="userprofile">Password</h6>
                  <Form.Control
                    type="password"
                    value={password}
                    className="userfield"
                    id="password"
                    onChange={onchange}
                    placeholder=""
                  />
                  <i
                    className="fa fa-envelope field-right-icon"
                    aria-hidden="true"
                  ></i>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <h6 className="userprofile">Confirm Password</h6>
                  <Form.Control
                    type="password"
                    value={confirmPassword}
                    className="userfield"
                    id="confirmPassword"
                    onChange={onchange}
                    placeholder=""
                  />
                  <i
                    className="fa fa-envelope field-right-icon"
                    aria-hidden="true"
                  ></i>
                </Form.Group>
              </Col>
            </Row>
          </Form>
          <Row className="sds">
            <div>
              <div className="updatebtn" onClick={validate}>
                {isloading?"Updating":"Update"}
              </div>
            </div>
          </Row>
        </Col>
      </Row>
      <ToastContainer
        enableMultiContainer
        containerId={"B"}
        toastClassName="bg-danger text-white"
        hideProgressBar={true}
        position={toast.POSITION.TOP_CENTER}
      />
      <ToastContainer
        enableMultiContainer
        containerId={"A"}
        toastClassName="bg-success text-white"
        hideProgressBar={true}
        position={toast.POSITION.TOP_CENTER}
      />
    </>
  );
};

export default Password;
