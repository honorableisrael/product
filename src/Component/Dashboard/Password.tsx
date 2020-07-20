import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Dashboard.css";
import Form from "react-bootstrap/Form";

const Password = () => {
  const [state, setFormState] = React.useState({
    errorMessage: "",
    confirmpassword: "",
    password: "",
    isloading: false,
  });
  const {
    errorMessage,
    password,
    confirmpassword,
    isloading,
  } = state;
  const onchange = (e: any) => {
    setFormState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };
  return (
    <>
      <Row className="refwq1">
        <Col md={12}>
          <Form>
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
                    value={confirmpassword}
                    className="userfield"
                    id="confirmpassword"
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
              <div className="updatebtn">Update</div>
            </div>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Password;
