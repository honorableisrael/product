import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Dashboard.css";
import Form from "react-bootstrap/Form";
import { useEffect } from "react";
import Axios from "axios";
import { API } from "../../config";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const PersonalDetails = () => {
  const [state, setFormState] = React.useState({
    errorMessage: "",
    user: "",
    firstname: "",
    lastname: "",
    dob: "",
    gender: "",
    country: "",
    address: "",
    phone: "",
    nationality: "",
    stateOfResidence: "",
    email: "",
    isloading: false,
  });
  const {
    errorMessage,
    firstname,
    lastname,
    dob,
    gender,
    address,
    phone,
    nationality,
    stateOfResidence,
    email,
    isloading,
  } = state;
  const onchange = (e: any) => {
    setFormState({
      ...state,
      [e.target.id]: e.target.value,
      errorMessage: "",
    });
  };
  const notify = (message: string, container = "A") => {
    toast(message, { containerId: container });
    setTimeout(()=>{
      window.location.reload()
    },2000)
  };
  const handleChange = (e) => {
    setFormState({
      ...state,
      gender: e.target.value,
      errorMessage: "",
    });
  };
  useEffect(() => {
    const loggedIn = localStorage.getItem("userDetails");
    const token = loggedIn ? JSON.parse(loggedIn).token : "";
    Axios.get(`${API}/api/v1/user`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        // console.log(res)
        setFormState({
          ...state,
          user: res.data.user,
          firstname: res.data.user ? res.data.user.firstname : "",
          email: res.data.user ? res.data.user.username : "",
          phone: res.data.user ? res.data.user.phone : "",
          address: res.data.user ? res.data.user.address : "",
          country: res.data.user ? res.data.user.country : "Nigeria",
          stateOfResidence: res.data.user ? res.data.user.state : "",
          dob: res.data.user ? res.data.user.dob : "",
          gender: res.data.user ? res.data.user.sex : "",
        });
      })
      .catch((err) => {
        // console.log(err)
      });
  }, []);

  const updatePersonalDetails = () => {
    setFormState({
      ...state,
      isloading: true,
    });
    const userinfo: any = localStorage.getItem("userDetails");
    const user_id = JSON.parse(userinfo);
    const id = user_id.user.id;
    var token = user_id.token;

    const data = {
      gender,
      dob,
      address,
      state: stateOfResidence,
      nationality,
      country: nationality,
      phone,
    };
    Axios.put(`${API}/api/v1/user/${id}`, data, {
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
        //    console.log(err)
        setFormState({
          ...state,
          isloading: false,
          errorMessage: "Failed to update",
        });
        notify("Update Failed","B");
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
                  <h6 className="userprofile">First Name</h6>
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
              </Col>
              <Col md={6}>
                <Form.Group>
                  <h6 className="userprofile">Last Name</h6>
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
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <h6 className="userprofile">Date Of Birth</h6>
                  <Form.Control
                    type="date"
                    onChange={onchange}
                    required
                    value={dob}
                    className="fmc"
                    id="dob"
                    placeholder="   "
                  />
                  <i
                    className="fa fa-envelope field-right-icon"
                    aria-hidden="true"
                  ></i>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <h6 className="userprofile">Gender</h6>
                  <Form.Control
                    as="select"
                    className="fmc"
                    onChange={handleChange}
                  >
                    <option>{gender ? gender : ""}</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
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
                  <h6 className="userprofile">Email</h6>
                  <Form.Control
                    type="email"
                    value={email}
                    className="userfield"
                    id="email"
                    onChange={onchange}
                    placeholder="email@email.com"
                  />
                  <i
                    className="fa fa-envelope field-right-icon"
                    aria-hidden="true"
                  ></i>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <h6 className="userprofile">Phone Number</h6>
                  <Form.Control
                    type="tel"
                    value={phone}
                    className="userfield"
                    id="phone"
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
                  <h6 className="userprofile">Nationality</h6>
                  <Form.Control
                    type="text"
                    value={nationality}
                    className="userfield"
                    id="nationality"
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
              <div className="updatebtn" onClick={updatePersonalDetails}>
                {isloading ? "Updating" : "Update"}
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

export default PersonalDetails;
