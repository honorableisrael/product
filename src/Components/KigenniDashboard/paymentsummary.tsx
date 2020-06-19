import * as React from "react";
import Navbar from "../Home/HomeComponents/navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./kegennidashboard.css";
import axios from "axios";
import { AxiosResponse } from "axios";
import { API } from "../../config";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

interface State {
  successMsg: boolean;
  errorMessage: string;
  user: any;
  userInfos:any;
  isLoading: boolean;
}

declare global {
  interface Window {
    MonnifySDK: any;
  }
}

export default function PaymentSummary(props:any) {
  const [state, setFormState] = React.useState<State>({
    errorMessage: "",
    user: "",
    userInfos:[],
    successMsg: false,
    isLoading: false,
  });
  const { errorMessage, successMsg,userInfos , isLoading } = state;
  React.useEffect(() => {
    const availableToken = sessionStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/signin");
    const data = {};
    axios
      .get<any, AxiosResponse<any>>(`${API}/freedashboard`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          setFormState({
            ...state,
            successMsg: true,
            isLoading: false,
          });
          // setInterval(props.history.push("/signin"), 5000);
        }
      })
      .catch((error) => {
        if (error && error.response && error.response.data) {
          setFormState({
            ...state,
            errorMessage: error.response.data[0].message,
            isLoading: false,
          });
        }
        setFormState({
          ...state,
          errorMessage: "failed to load",
          isLoading: false,
        });
      });
  }, []);
  const payWithMonnify = (reference) => {
    const availableUser = sessionStorage.getItem("user");
    var user = availableUser
    ? JSON.parse(availableUser)
    : props.history.push("/signin");
    try {
      window.MonnifySDK.initialize({
        amount: 5500,
        currency: "NGN",
        reference,
        customerFullName:user[0]?.first_name + "  "+ user[0]?.last_name,
        customerEmail: "monnify@monnify.com",
        customerMobileNumber: "08121281921",
        apiKey: "MK_TEST_WQZNXHV9FY",
        contractCode: "4978848198",
        paymentDescription: "Test Pay",
        isTestMode: true,
        onComplete: function(response) {
          moveToFullResult();
          if(response.paymentStatus=="OVERPAID"){
             (notify("You current payment has exceeded the amount. The excess amount will be refunded within 24 hours"));
                return setInterval(
                    window.location.pathname = "/",
                10000
            );
        }
        if (response.paymentStatus=="PAID"){
            // console.log(response)
                return setInterval(
                    window.location.pathname = "/kigenni/fullresult",
                9000
            );
        }
        if (response.paymentStatus=="PENDING"){
            (notify("Payment Pending"));
                return setInterval(
                    window.location.pathname = "/",
                9000
            );
        }
        },
        onClose: function(data) {
          //Implement what should happen when the modal is closed here
          console.log(data);
        },
      });
    }
    catch (error) {
      console.log("Failed to initailize payment" + error);
    }
  };

  const requestForPayref = () => {
    setFormState({
      ...state,
      isLoading: true,
    });
    const availableToken = sessionStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/signin");
    axios
      .get(`${API}/monnifypaymentreference`,{
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        console.log(response);
        setFormState({
          ...state,
          user: response?.data[0]?.payment_reference,
          isLoading: false,
        });
        setTimeout(() => {
          payWithMonnify(response?.data[0]?.payment_reference);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        setFormState({
          ...state,
          isLoading: false,
        });
      });
  };
  const notify = (message: string) => {
    toast(message, { containerId: "B" });
    setTimeout(() => {
      props.history.push("");
    }, 3000);
  };
  const checkIfUserHasAccessToViewAll = () => {
    requestForPayref();
  };
  const moveToFullResult=()=>{
    props.history.push("/kigenni/fullresult");
  };
  return (
    <div>
      <Navbar />
      <Container fluid={true}>
        <Row className="kli6 bcbv">
          <Col md={6}>
            <div className="payheader">
              Choose the plan that’s right for you
            </div>
            <Row className="centerr">
              <Col md={4} className="centerr1">
                <div className="prems">Premium</div>
                <div className="premq">Get access to your complete result</div>
                <div className="comps1">
                  <span>&#10004;</span> Complete Assement Result
                </div>
                <div className="lmi1">
                  <div className="amut">#5000</div>
                  <div className="amut1">one time payment</div>
                </div>
                <div className="slcplan"
                  onClick={() => checkIfUserHasAccessToViewAll()}
                >
                  {!isLoading?"Select Plan":"processing..."}
                </div>
              </Col>
              <Col md={4} className="centerr2">
                <div className="prems">Starter</div>
                <div className="premq1">
                  Get access to your first three sections of your assessment
                  results
                </div>
                <div className="comps2">
                  <span>&#10004; </span> Career Profile
                </div>
                <div className="comps2">
                  <span>&#10004; </span> Career Fitness Score
                </div>
                <div className="comps2">
                  <span>&#10004; </span> Career Personality Type
                </div>
                <div className="lmi2">
                  <div className="amut">FREE</div>
                </div>
                <div
                  className="slcplan1"
                >
                  <Link to="/kigenni/dashboard">
                    Select Plan
                  </Link>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
