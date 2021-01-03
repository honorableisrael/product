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
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PersonalDetails = () => {
  const [state, setFormState] = React.useState<any>({
    errorMessage: [],
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
  }: any = state;
  const onchange = (e: any) => {
    setFormState({
      ...state,
      [e.target.id]: e.target.value,
      errorMessage: "",
    });
  };
  const notify = (message: string, container = "A") => {
    toast(message, { containerId: container });
    setTimeout(() => {
      window.location.reload();
    }, 5000);
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
    Axios.get(`${API}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log(res);
        setFormState({
          ...state,
          user: res.data.data,
          firstname: res.data.data ? res.data.data.firstname : "",
          lastname: res.data.data ? res.data.data.lastname : "",
          email: res.data.data ? res.data.data.username : "",
          phone: res.data.data ? res.data.data.phone : "",
          address: res.data.data ? res.data.data.address : "",
          country: res.data.data ? res.data.data.country : "Nigeria",
          stateOfResidence: res.data.data ? res.data.data.state : "",
          dob: res.data.data ? res.data.data.dob : "",
          nationality:res?.data?.data?.nationality,
          gender: res.data.data ? res.data.data.sex : "",
        });
      })
      .catch((err) => {
        // console.log(err)
      });
  }, []);

  const updatePersonalDetails = () => {
    if (
      gender == "" ||
      dob == "" ||
      address == "" ||
      email == "" ||
      state == "" ||
      nationality === "" ||
      phone == ""
    ) {
      return notify("All fields are required");
    }
    setFormState({
      ...state,
      isloading: true,
    });
    const userinfo: any = localStorage.getItem("userDetails");
    const user_id = JSON.parse(userinfo);
    const id = user_id?.user?.id;
    var token = user_id?.token;
    const data = {
      firstname,
      lastname,
      sex:gender,
      dob,
      address,
      email,
      state: stateOfResidence,
      nationality,
      phone,
    };
    console.log(data);
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
        console.log(err.response);
        if (err?.response?.status == 422) {
          setFormState({
            ...state,
            isloading: false,
          });
          return notify(err?.response?.data?.error?.dob?.[0]);
        }
        setFormState({
          ...state,
          isloading: false,
          errorMessage: "Failed to update",
        });
        return notify("Failed to update please try again later");
      });
  };
  console.log(errorMessage);
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
                  {/* <Form.Control
                    type="tel"
                    value={phone}
                    className="userfield"
                    id="phone"
                    onChange={onchange}
                    placeholder=""
                  /> */}
                  <PhoneInput
                    country={"ng"}
                    disableCountryCode={true}
                    inputProps={{
                      name: "phone",
                      required: true,
                      autoFocus: true,
                    }}
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e: any) => {
                      setFormState({
                        ...state,
                        phone: e?.target?.value,
                      });
                    }}
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
