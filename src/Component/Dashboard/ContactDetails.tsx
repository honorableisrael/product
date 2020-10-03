import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Dashboard.css";
import Form from "react-bootstrap/Form";
import allCountries from "./listOfCountriesInTheWorld";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Axios from "axios";
import { API } from "../../config";



const ContactDetails = () => {
  const [state, setFormState] = React.useState({
    errorMessage: "",
    address: "",
    isloading: false,
    user: "",
    firstname: "",
    lastname: "",
    dob: "",
    gender: "",
    country: "",
    phone: "",
    nationality: "",
    stateOfResidence: "",
    email: "",
    state_city: "",
    Country:"Nigeria",
    city: "",
  });
  const { errorMessage, state_city, gender, city, address, isloading,Country } = state;
  const onchange = (e: any) => {
    setFormState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };
  const handleChange = (e) => {
    setFormState({
      ...state,
      Country: e.target.value,
    });
  };
  const notify = (message: string, container = "A") => {
    toast(message, { containerId: container });
    setTimeout(()=>{
      window.location.reload()
    },2000)
  };
  React.useEffect(() => {
    const loggedIn = localStorage.getItem("userDetails");
    const token = loggedIn ? JSON.parse(loggedIn).token : "";
    Axios.get(`${API}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log(res)
        setFormState({
          ...state,
          user: res.data.data,
          firstname: res.data.data ? res.data.data.firstname : "",
          lastname: res.data.data ? res.data.data.lastname : "",
          email: res.data.data ? res.data.data.username : "",
          phone: res.data.data ? res.data.data.phone : "",
          address: res.data.data ? res.data.data.address : "",
          country: res.data.data ? res.data.data.country : "Nigeria",
          state_city: res.data.data ? res.data.data.state : "",
          dob: res.data.data ? res.data.data.dob : "",
          gender: res.data.data ? res.data.data.sex : "",
        });
      })
      .catch((err) => {
        // console.log(err)
      });
  }, []);
  const updateContactDetails = () => {
    setFormState({
      ...state,
      isloading: true,
    });
    console.log("running")
    const userinfo: any = localStorage.getItem("userDetails");
    const user_id = JSON.parse(userinfo);
    const id = user_id?.user?.id;
    var token = user_id?.token;
    const data = {
      country:Country,
      address,
      state:state_city,
    };
    Axios.put(`${API}/user/update`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log(res);
        setFormState({
          ...state,
          isloading: false,
          errorMessage: "",
        });
        notify("Update Successfull");
      })
      .catch((err) => {
           console.log(err)
        setFormState({
          ...state,
          isloading: false,
          errorMessage: "Failed to update",
        });
        notify("Update Failed", "B");
      });
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
                      {Country ? Country : "Not Chosen..."}
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
            {/* <Row>
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
            </Row> */}
          </Form>
          <Row className="sds">
            <div>
              <div className="updatebtn" onClick={updateContactDetails}>Update</div>
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
