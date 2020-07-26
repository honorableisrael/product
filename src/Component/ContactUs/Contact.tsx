import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBar from "../SubComponents/Navbar";
import HomeLayer1 from "../../assets/HomeLayer1.svg";
import "./Contact.css";
import GetMobileApp from "../Home/GetMobileApp";
import Footer from "../Home/Footer";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import { API } from "../../config";
import { useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


interface IAppProps {}

const Contact: React.FunctionComponent<IAppProps> = (props: any) => {
  const [state, setFormState] = React.useState({
    errorMessage: "",
    fullname: "",
    message: "",
    howcanwehelpyou: "",
    email: "",
    successMessage: "",
    phone: "",
    password: "",
    isloading: false,
  });
  const {
    phone,
    email,
    errorMessage,
    isloading,
    fullname,
    message,
    successMessage,
    howcanwehelpyou,
  } = state;

  const onchange = (e) => {
    setFormState({
      ...state,
      [e.target.id]: e.target.value,
      errorMessage:""
    });
  };
  useEffect(() => {
    window.scrollTo(-0, -0);
  }, []);
  const validateForm = (e) => {
    e.preventDefault();
    if (
      phone ==="" ||
      email ==="" ||
      fullname ==="" ||
      message ==="" ||
      howcanwehelpyou ===""
    ) {
     return setFormState({
        ...state,
        errorMessage:"All fields are required"
      })
    }
    else{
      sendMessage()
    }
  };
  const sendMessage = () => {
    setFormState({
      ...state,
      isloading: true,
    });
    const data = {
      name: fullname,
      phone,
      email: email,
      subject: howcanwehelpyou,
      message,
    };
    console.log(data)
    Axios.post(`${API}/api/v1/contact`, data)
      .then((res) => {
        console.log(res);
        setFormState({
          ...state,
          successMessage: "",
          isloading: false,
          errorMessage:
            res.data && res.data.errors
              ? "Validation error all fields are required"
              : "",
        });
        if (res.data.responseStatus === 200) {
          setFormState({
            ...state,
            isloading: false,
            successMessage: "Message Sent",
          });
          notify("Message Sent","A");
        }
      })
      .catch((err) => {
        console.log(err);
        setFormState({
          ...state,
          errorMessage: "Network Error Failed to connect",
          isloading: false,
        });
        notify("Failed to send","B");
      });
  };
  const notify = (message: string,container="A") => toast(message, { containerId: container });
  return (
    <>
      <NavBar />
      <Container fluid={true} className="push">
        <Row className="jcenter greenbg">
          <Col md={10} className="nopaddin">
            <div className="contactus">Contact Us</div>
            <div className="letstalk">Let's Talk</div>
          </Col>
        </Row>
        <Row className="jcenter">
          <Col md={10} className="nopaddin1">
            <Row className="nopaddin1 oi12">
              <Col md={6} className="formwrapper">
                <div className="contactenquire">Contact/Enquiry Form</div>
                <Form onSubmit={validateForm}>
                  {errorMessage && (
                    <Alert variant={"danger"}>{errorMessage}</Alert>
                  )}
                  <p className="loginerror">{}</p>
                  <Form.Group>
                    <h6 className="user12">Full Name</h6>
                    <Form.Control
                      type="text"
                      value={fullname}
                      className="userfield"
                      id="fullname"
                      onChange={onchange}
                      placeholder=""
                    />
                    <i
                      className="fa fa-envelope field-right-icon"
                      aria-hidden="true"
                    ></i>
                  </Form.Group>
                  <Form.Group>
                    <h6 className="user12">Phone Number</h6>
                    <Form.Control
                      type="tel"
                      onChange={onchange}
                      value={phone}
                      className="userfield"
                      id="phone"
                      placeholder=""
                    />
                  </Form.Group>
                  <Form.Group>
                    <h6 className="user12">Email Address</h6>
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
                    <h6 className="user12">How can we help you?</h6>
                    <Form.Control
                      type="text"
                      value={howcanwehelpyou}
                      className="userfield"
                      id="howcanwehelpyou"
                      onChange={onchange}
                      placeholder=""
                    />
                    <i
                      className="fa fa-envelope field-right-icon"
                      aria-hidden="true"
                    ></i>
                  </Form.Group>
                  <Form.Group>
                    <h6 className="user12">Message</h6>
                    <Form.Control
                      type="text"
                      value={message}
                      className="userfield extrah"
                      id="message"
                      onChange={onchange}
                      placeholder=""
                    />
                    <i
                      className="fa fa-envelope field-right-icon"
                      aria-hidden="true"
                    ></i>
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
                      {!isloading ? "SUBMIT" : "SUBMITTING"}
                    </Button>{" "}
                  </Form.Group>
                </Form>
              </Col>
              <Col md={5} className="infowrapper1">
                <div className="headercontact">Office Address</div>
                <div className="contactcontent">
                  15, Ihuntayi Road, Off Palace Road, Oniru, Victoria Island
                  101501, Lagos, Nigeria.
                </div>
                <div className="headercontact">Email</div>
                <div className="corres">
                  All official correspondence and enquiries should be forwarded
                  to
                </div>
                <div className="contactcontent">
                  <a href="mailto:hello@pramopro.com" className="linkphone">
                    hello@pramopro.com
                  </a>
                </div>
                <div className="headercontact">Helplines</div>
                <div className="corres">
                  Want to speak to someone from our team? We will be available
                  to respond to all your inquiries on
                </div>
                <div className="contactcontent2">
                  Mondays through Fridays from 8:30am to 4pm.
                </div>
                <div className="contactcontent1">
                  <a href="tel:+234 901 166 5589" className="linkphone">
                    +234 901 166 5589
                  </a>
                </div>
                <div className="contactcontent">
                  <a href="tel:+234 909 142 9212" className="linkphone">
                    +234 909 142 9212
                  </a>
                </div>
              </Col>
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
            </Row>
          </Col>
        </Row>
        <GetMobileApp />
        <Footer />
      </Container>
    </>
  );
};

export default Contact;