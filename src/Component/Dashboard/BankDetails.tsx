import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Dashboard.css";
import Form from "react-bootstrap/Form";

const BankDetails = () => {
  const [state, setFormState] = React.useState({
    errorMessage: "",
    firstname: "",
    lastname: "",
    dob: "",
    gender: "",
    phone: "",
    nationality: "",
    email: "",
    isloading: false,
  });
  const {
    errorMessage,
    firstname,
    lastname,
    dob,
    gender,
    phone,
    nationality,
    email,
    isloading,
  } = state;
  const onchange = (e: any) => {
    setFormState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };
  const handleChange = (e) => {
    setFormState({
      ...state,
      gender: e.target.value,
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
                  <h6 className="userprofile">Account Name</h6>
                  <Form.Control
                    type="text"
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
              </Col>
              <Col md={6}>
                <Form.Group>
                  <h6 className="userprofile">Bank Name</h6>
                  <Form.Control
                    as="select"
                    className="fmc"
                    onChange={handleChange}
                  >
                    <option></option>
                    <option value="Male">...</option>
                    <option value="Female">...</option>
                    ))}
                  </Form.Control>
                  <i
                    className="fa fa-envelope field-right-icon"
                    aria-hidden="true"
                  ></i>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <h6 className="userprofile">Account Number</h6>
                  <Form.Control
                    type="text"
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

export default BankDetails;
