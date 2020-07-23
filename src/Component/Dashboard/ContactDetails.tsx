import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Dashboard.css";
import Form from "react-bootstrap/Form";
import allCountries from "./listOfCountriesInTheWorld";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";



const ContactDetails = () => {
  const [state, setFormState] = React.useState({
    errorMessage: "",
    address: "",
    isloading: false,
    state_city: "",
    Bank_Country:"",
    gender: "",
    city: "",
  });
  const { errorMessage, state_city, gender, city, address, isloading,Bank_Country } = state;
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
  const notify = (message: string, container = "A") => {
    toast(message, { containerId: container });
    setTimeout(()=>{
      window.location.reload()
    },2000)
  };
  return (
    <>
      <Row className="refwq1">
        <Col md={12}>
          <Form>
            <Row>
              <Col md={12}>
                <Form.Group>
                  <h6 className="userprofile">Address</h6>
                  <Form.Control
                    type="text"
                    value={address}
                    className="userfield"
                    id="address"
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
            <Row>
              <Col md={6}>
                <Form.Group>
                  <h6 className="userprofile">Country</h6>
                  <Form.Control
                    as="select"
                    className="fmc"
                    onChange={handleChange}
                  >
                    <option>
                      {Bank_Country ? Bank_Country : "Not Chosen..."}
                    </option>
                    {allCountries.map((x) => (
                      <option value={x.name} key={x.name} id="country">
                        {x.name}
                      </option>
                    ))}
                  </Form.Control>
                  <i
                    className="fa fa-envelope field-right-icon"
                    aria-hidden="true"
                  ></i>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <h6 className="userprofile">State</h6>
                  <Form.Control
                    type="text"
                    value={state_city}
                    className="userfield"
                    id="state_city"
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
            <Row>
              <Col md={6}>
                <Form.Group>
                  <h6 className="userprofile">City</h6>
                  <Form.Control
                    type="text"
                    value={city}
                    className="userfield"
                    id="city"
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

export default ContactDetails;
